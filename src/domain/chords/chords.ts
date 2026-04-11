import { generateAll, GeneratedEntry } from "../notes/generator";

const CHORD_FORMULAS: { name: string; intervals: number[] }[] = [
  // Triads
  { name: "Major", intervals: [0, 4, 7] },
  { name: "Minor", intervals: [0, 3, 7] },
  { name: "Diminished", intervals: [0, 3, 6] },
  { name: "Augmented", intervals: [0, 4, 8] },

  // Suspended
  { name: "Sus2", intervals: [0, 2, 7] },
  { name: "Sus4", intervals: [0, 5, 7] },

  // Seventh chords
  { name: "Dominant 7", intervals: [0, 4, 7, 10] },
  { name: "Major 7", intervals: [0, 4, 7, 11] },
  { name: "Minor 7", intervals: [0, 3, 7, 10] },
  { name: "Minor Major 7", intervals: [0, 3, 7, 11] },
  { name: "Diminished 7", intervals: [0, 3, 6, 9] },
  { name: "Half-Diminished 7", intervals: [0, 3, 6, 10] },
  { name: "Augmented 7", intervals: [0, 4, 8, 10] },

  // Extended
  { name: "Add9", intervals: [0, 4, 7, 14] },
  { name: "6", intervals: [0, 4, 7, 9] },
  { name: "Minor 6", intervals: [0, 3, 7, 9] },

  // Power chord
  { name: "5", intervals: [0, 7] },
];

export const CHORDS: GeneratedEntry[] = CHORD_FORMULAS.flatMap((formula) =>
  generateAll(formula.name, formula.intervals),
);
