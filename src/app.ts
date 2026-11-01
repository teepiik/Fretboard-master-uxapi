import express from "express";
import swaggerUi from "swagger-ui-express";
import healthRoutes from "./routes/health.routes";
import theoryRoutes from "./routes/theory.routes";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler, notFoundHandler } from "./middleware/error";
import { openApiDocument } from "./openapi";

const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/theory", theoryRoutes);

app.get("/openapi.json", (_req, res) => {
  res.json(openApiDocument);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
