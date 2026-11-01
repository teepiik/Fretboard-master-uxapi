export interface Tuning {
  /** Stable identifier used by the API. */
  id: string;
  name: string;
  /** Open-string MIDI numbers, lowest string first. */
  midi: number[];
}

export const TUNINGS: Tuning[] = [
  { id: "standard", name: "Standard (E A D G B E)", midi: [40, 45, 50, 55, 59, 64] },
  { id: "drop-d", name: "Drop D (D A D G B E)", midi: [38, 45, 50, 55, 59, 64] },
  { id: "dadgad", name: "DADGAD", midi: [38, 45, 50, 55, 57, 62] },
  { id: "open-g", name: "Open G (D G D G B D)", midi: [38, 43, 50, 55, 59, 62] },
];

export const TUNING_IDS = TUNINGS.map((t) => t.id) as [string, ...string[]];

export function getTuningById(id: string): Tuning | undefined {
  return TUNINGS.find((t) => t.id === id);
}
