import { CHROMATIC_SCALE } from "./chromatic";

export interface GeneratedEntry {
  name: string;
  notes: string[];
}

export function generateNotes(root: string, intervals: number[]): string[] {
  const rootIndex = CHROMATIC_SCALE.indexOf(root);
  if (rootIndex === -1) {
    throw new Error(`Invalid root note: ${root}`);
  }
  return intervals.map((i) => CHROMATIC_SCALE[(rootIndex + i) % 12]);
}

export function generateAll(
  qualityName: string,
  intervals: number[],
): GeneratedEntry[] {
  return CHROMATIC_SCALE.map((root) => ({
    name: `${root} ${qualityName}`,
    notes: generateNotes(root, intervals),
  }));
}
