import cors from "cors";
import { getAllowedOrigins } from "../config";

export function corsMiddleware() {
  const allowed = new Set(getAllowedOrigins());
  return cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin header) and whitelisted origins.
      if (!origin || allowed.has(origin)) return callback(null, true);
      return callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  });
}
