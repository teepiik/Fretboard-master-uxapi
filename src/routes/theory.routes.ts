import { Router } from "express";
import { analyze } from "../controllers/theory.controller";
import { AnalyzeSchema } from "../schemas/theory.schema";

const router = Router();

router.post("/analyze", (req, res) => {
  try {
    const validated = AnalyzeSchema.parse(req.body);
    analyze({ body: validated } as any, res);
  } catch (err) {
    const details =
      err && typeof err === "object" && "errors" in err
        ? (err as any).errors
        : err;
    res.status(400).json({ error: "Invalid input", details });
  }
});

export default router;
