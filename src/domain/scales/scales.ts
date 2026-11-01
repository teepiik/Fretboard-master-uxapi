import { generateAll, GeneratedEntry } from "../notes/generator";

export interface ScaleFormula {
  /** Stable kebab-case identifier used by the API. */
  id: string;
  /** Human-readable name. */
  name: string;
  /** Semitone offsets from the root. */
  intervals: number[];
}

export const SCALE_FORMULAS: ScaleFormula[] = [
  // Major and modes
  { id: "major", name: "Major", intervals: [0, 2, 4, 5, 7, 9, 11] },
  { id: "dorian", name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
  { id: "phrygian", name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10] },
  { id: "lydian", name: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11] },
  { id: "mixolydian", name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
  { id: "natural-minor", name: "Natural Minor (Aeolian)", intervals: [0, 2, 3, 5, 7, 8, 10] },
  { id: "locrian", name: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10] },

  // Harmonic & melodic minor
  { id: "harmonic-minor", name: "Harmonic Minor", intervals: [0, 2, 3, 5, 7, 8, 11] },
  { id: "melodic-minor", name: "Melodic Minor", intervals: [0, 2, 3, 5, 7, 9, 11] },

  // Pentatonic
  { id: "major-pentatonic", name: "Major Pentatonic", intervals: [0, 2, 4, 7, 9] },
  { id: "minor-pentatonic", name: "Minor Pentatonic", intervals: [0, 3, 5, 7, 10] },

  // Blues
  { id: "major-blues", name: "Major Blues", intervals: [0, 2, 3, 4, 7, 9] },
  { id: "minor-blues", name: "Minor Blues", intervals: [0, 3, 5, 6, 7, 10] },

  // Diminished & whole tone
  { id: "whole-tone", name: "Whole Tone", intervals: [0, 2, 4, 6, 8, 10] },
  { id: "diminished-hw", name: "Diminished HW", intervals: [0, 1, 3, 4, 6, 7, 9, 10] },
  { id: "diminished-wh", name: "Diminished WH", intervals: [0, 2, 3, 5, 6, 8, 9, 11] },
];

export const SCALE_IDS = SCALE_FORMULAS.map((s) => s.id) as [string, ...string[]];

export function getScaleById(id: string): ScaleFormula | undefined {
  return SCALE_FORMULAS.find((s) => s.id === id);
}

/** Every scale formula applied to every chromatic root, e.g. "C Major". */
export const SCALES: GeneratedEntry[] = SCALE_FORMULAS.flatMap((formula) =>
  generateAll(formula.name, formula.intervals),
);
