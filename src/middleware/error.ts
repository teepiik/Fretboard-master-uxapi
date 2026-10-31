import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Zod v4 exposes validation problems on `issues` (there is no `errors` property).
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Invalid input", details: err.issues });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  // Errors raised by express.json() (malformed body, payload too large) carry a status.
  const status =
    typeof err === "object" && err !== null && "status" in err && typeof err.status === "number"
      ? err.status
      : 500;

  if (status >= 500) {
    console.error(err);
    res.status(status).json({ error: "Internal server error" });
    return;
  }

  const message = err instanceof Error ? err.message : "Request failed";
  res.status(status).json({ error: message });
};
