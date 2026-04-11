import { GeneratedEntry } from "../notes/generator";
import { CHORDS } from "../chords/chords";

export interface DiatonicChord {
  degree: number;
  triad: string;
  seventh: string;
}

function findChordName(notes: string[]): string {
  const sorted = [...notes].sort();
  const match = CHORDS.find((c) => {
    if (c.notes.length !== sorted.length) return false;
    return [...c.notes].sort().every((n, i) => n === sorted[i]);
  });
  return match?.name ?? `${notes[0]} (unknown)`;
}

export function getDiatonicChords(scale: GeneratedEntry): DiatonicChord[] {
  const { notes } = scale;
  // Diatonic chord construction only makes sense for 7-note scales
  if (notes.length !== 7) return [];

  return notes.map((_, i) => {
    const triadNotes = [notes[i], notes[(i + 2) % 7], notes[(i + 4) % 7]];
    const seventhNotes = [
      notes[i],
      notes[(i + 2) % 7],
      notes[(i + 4) % 7],
      notes[(i + 6) % 7],
    ];
    return {
      degree: i + 1,
      triad: findChordName(triadNotes),
      seventh: findChordName(seventhNotes),
    };
  });
}
