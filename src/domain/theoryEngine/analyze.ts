import { normalizeNotes } from "../notes/normalize";
import { CHORDS } from "../chords/chords";
import { SCALES } from "../scales/scales";
import { isSubset } from "./match";
import { getDiatonicChords } from "./diatonic";

export function analyzeNotes(input: string[]) {
  const notes = normalizeNotes(input);

  const matchingChords = CHORDS.filter((chord) => isSubset(notes, chord.notes));
  const matchingScales = SCALES.filter((scale) => isSubset(notes, scale.notes));

  return {
    input: notes,
    chords: matchingChords.map((c) => c.name),
    scales: matchingScales.map((scale) => ({
      name: scale.name,
      diatonicChords: getDiatonicChords(scale),
    })),
  };
}
