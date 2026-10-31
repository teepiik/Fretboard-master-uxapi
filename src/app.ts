import express from "express";
import healthRoutes from "./routes/health.routes";
import theoryRoutes from "./routes/theory.routes";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler, notFoundHandler } from "./middleware/error";

const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/theory", theoryRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
