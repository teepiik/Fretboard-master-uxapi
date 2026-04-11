const enharmonics: Record<string, string> = {
  Bb: "A#",
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Cb: "B",
  Fb: "E",
  "E#": "F",
  "B#": "C",
};

/**
 * Normalize a musical note to its sharp/natural equivalent.
 * Converts flats to sharps and resolves edge cases like E#, B#, Cb, Fb.
 * @param note A musical note, e.g. "C#", "Db", "E", etc.
 * @returns The normalized note using only naturals and sharps.
 */
export function normalizeNote(note: string): string {
  const trimmed = note.trim();
  // Capitalize first letter, keep rest as-is (e.g. "c#" -> "C#")
  const n = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return enharmonics[n] ?? n;
}

export function normalizeNotes(notes: string[]): string[] {
  return notes.map(normalizeNote);
}

// TODO Add sorting to order?
