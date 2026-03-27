import { z } from "zod";

export const AnalyzeSchema = z.object({ notes: z.array(z.string()).min(1) });
