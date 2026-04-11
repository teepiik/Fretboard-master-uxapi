import { generateAll, GeneratedEntry } from "../notes/generator";

const SCALE_FORMULAS: { name: string; intervals: number[] }[] = [
  // Major and modes
  { name: "Major", intervals: [0, 2, 4, 5, 7, 9, 11] },
  { name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
  { name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10] },
  { name: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11] },
  { name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
  { name: "Aeolian", intervals: [0, 2, 3, 5, 7, 8, 10] },
  { name: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10] },

  // Harmonic & melodic minor
  { name: "Harmonic Minor", intervals: [0, 2, 3, 5, 7, 8, 11] },
  { name: "Melodic Minor", intervals: [0, 2, 3, 5, 7, 9, 11] },

  // Pentatonic
  { name: "Major Pentatonic", intervals: [0, 2, 4, 7, 9] },
  { name: "Minor Pentatonic", intervals: [0, 3, 5, 7, 10] },

  // Blues
  { name: "Major Blues", intervals: [0, 2, 3, 4, 7, 9] },
  { name: "Minor Blues", intervals: [0, 3, 5, 6, 7, 10] },

  // Diminished & whole tone
  { name: "Whole Tone", intervals: [0, 2, 4, 6, 8, 10] },
  { name: "Diminished HW", intervals: [0, 1, 3, 4, 6, 7, 9, 10] },
  { name: "Diminished WH", intervals: [0, 2, 3, 5, 6, 8, 9, 11] },
];

export const SCALES: GeneratedEntry[] = SCALE_FORMULAS.flatMap((formula) =>
  generateAll(formula.name, formula.intervals),
);
