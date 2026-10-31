import { Router } from "express";
import { analyze } from "../controllers/theory.controller";
import { AnalyzeSchema } from "../schemas/theory.schema";

const router = Router();

router.post("/analyze", (req, res) => {
  // ZodError thrown here is forwarded to the global error handler (Express 5).
  req.body = AnalyzeSchema.parse(req.body);
  analyze(req, res);
});

export default router;
