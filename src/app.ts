import express from "express";
import theoryRoutes from "./routes/theory.routes";

const app = express();

app.use(express.json());
app.use("/theory", theoryRoutes);

export default app;
