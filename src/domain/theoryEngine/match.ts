export function isSubset(input: string[], target: string[]): boolean {
  return input.every((n) => target.includes(n));
}
