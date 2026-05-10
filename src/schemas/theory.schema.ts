import { z } from "zod";

// Accept natural notes and optional single-sharp or single-flat (case-insensitive),
// e.g. C, F#, Bb.
export const AnalyzeSchema = z.object({
  notes: z
    .array(
      z
        .string()
        .regex(
          /^[A-G](#|b)?$/i,
          "Invalid note: use natural notes and single sharps or flats, e.g. C, F#, Bb",
        ),
    )
    .min(1),
});
