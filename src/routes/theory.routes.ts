import { Router } from "express";
import { analyze } from "../controllers/theory.controller";
import { SCALE_FORMULAS } from "../domain/scales/scales";
import { TUNINGS } from "../domain/tunings/tunings";
import { AnalyzeSchema } from "../schemas/theory.schema";

const CACHE_ONE_DAY = "public, max-age=86400";

const router = Router();

router.get("/scales", (_req, res) => {
  res.set("Cache-Control", CACHE_ONE_DAY);
  res.json({ scales: SCALE_FORMULAS });
});

router.get("/tunings", (_req, res) => {
  res.set("Cache-Control", CACHE_ONE_DAY);
  res.json({ tunings: TUNINGS });
});

router.post("/analyze", (req, res) => {
  // ZodError thrown here is forwarded to the global error handler (Express 5).
  req.body = AnalyzeSchema.parse(req.body);
  analyze(req, res);
});

export default router;
