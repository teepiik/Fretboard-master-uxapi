import { z } from "zod";
import { SCALE_IDS } from "../domain/scales/scales";
import { TUNING_IDS } from "../domain/tunings/tunings";

export const NoteNameSchema = z
  .string()
  .regex(/^[A-G](#|b)?$/i, "Invalid note: use natural notes and single sharps or flats, e.g. C, F#, Bb")
  .meta({ id: "NoteName", description: "A note name: natural with optional single sharp or flat.", example: "F#" });

export const ScaleIdSchema = z.enum(SCALE_IDS).meta({ id: "ScaleId" });
export const TuningIdSchema = z.enum(TUNING_IDS).meta({ id: "TuningId" });

export const ScaleSchema = z
  .object({
    id: ScaleIdSchema,
    name: z.string(),
    intervals: z.array(z.number().int()).describe("Semitone offsets from the root, starting at 0"),
  })
  .meta({ id: "Scale" });

export const ScaleListSchema = z.object({ scales: z.array(ScaleSchema) }).meta({ id: "ScaleList" });

export const TuningSchema = z
  .object({
    id: TuningIdSchema,
    name: z.string(),
    midi: z.array(z.number().int()).describe("Open-string MIDI numbers, lowest string first (C4 = 60)"),
  })
  .meta({ id: "Tuning" });

export const TuningListSchema = z.object({ tunings: z.array(TuningSchema) }).meta({ id: "TuningList" });

export const AnalyzeSchema = z
  .object({
    notes: z.array(NoteNameSchema).min(1),
  })
  .meta({ id: "AnalyzeRequest" });

export const DiatonicChordSchema = z
  .object({
    degree: z.number().int().describe("Scale degree, 1-based"),
    triad: z.string(),
    seventh: z.string(),
  })
  .meta({ id: "DiatonicChord" });

export const AnalyzeResponseSchema = z
  .object({
    input: z.array(z.string()).describe("Normalized notes (sharps, uppercase)"),
    chords: z.array(z.string()).describe("Chord names that contain all input notes"),
    scales: z.array(
      z.object({
        name: z.string(),
        diatonicChords: z.array(DiatonicChordSchema),
      }),
    ),
  })
  .meta({ id: "AnalyzeResponse" });
