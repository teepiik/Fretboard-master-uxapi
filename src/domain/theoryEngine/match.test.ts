import { describe, it, expect } from "vitest";
import { isSubset } from "./match";
import { normalizeNotes } from "../notes/normalize";

describe("isSubset", () => {
  it("should return true if all input notes are in the target", () => {
    const input = ["C", "E"];
    const target = ["C", "D", "E", "F"];
    expect(isSubset(input, target)).toBe(true);
  });

  it("returns false when any input note is missing", () => {
    expect(isSubset(["C", "G#"], ["C", "D", "E", "F"])).toBe(false);
  });

  // While mathematically an empty set is a subset of any set, in musical context
  // it doesn't make sense to say that an empty input matches any chord or scale.
  it("treats empty input as not a subset", () => {
    expect(isSubset([], ["C", "D"])).toBe(false);
  });

  it("is order-independent", () => {
    expect(isSubset(["E", "C"], ["C", "D", "E"])).toBe(true);
  });

  it("handles duplicate notes in input", () => {
    expect(isSubset(["C", "C", "E"], ["C", "D", "E"])).toBe(true);
  });

  it("handles note normalization", () => {
    const normalized = normalizeNotes(["Bb"]); // -> ["A#"]
    expect(isSubset(normalized, ["A#", "C", "E"])).toBe(true);
  });
});
