const enharmonics: Record<string, string> = {
  Bb: "A#",
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
};

/**
 * Normalize a musical note to its enharmonic equivalent, from flat to sharp.
 * @param note A musical note, e.g. "C#", "Db", "E", etc.
 * @returns The normalized note, e.g. "Db" -> "C#".
 */
export function normalizeNote(note: string): string {
  const n = note.trim().toUpperCase();
  return enharmonics[n] || n;
}

export function normalizeNotes(notes: string[]): string[] {
  return notes.map(normalizeNote);
}

// TODO Add sorting to order?
