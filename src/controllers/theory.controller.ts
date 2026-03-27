import { analyzeNotes } from "../domain/theoryEngine/analyze";

import { Request, Response } from "express";

export function analyze(req: Request, res: Response) {
  const result = analyzeNotes(req.body.notes);
  res.json(result);
}
