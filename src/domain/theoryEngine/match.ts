export function isSubset(input: string[], target: string[]): boolean {
  if (input.length < 1) return false;
  return input.every((n) => target.includes(n));
}
