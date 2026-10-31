import { describe, it, expect } from "vitest";
import { normalizeNote, normalizeNotes } from "./normalize";

describe("normalizeNote", () => {
  it("keeps naturals and sharps as-is", () => {
    expect(normalizeNote("C")).toBe("C");
    expect(normalizeNote("F#")).toBe("F#");
  });

  it("converts flats to sharps", () => {
    expect(normalizeNote("Bb")).toBe("A#");
    expect(normalizeNote("Db")).toBe("C#");
    expect(normalizeNote("Ab")).toBe("G#");
  });

  it("resolves enharmonic edge cases", () => {
    expect(normalizeNote("Cb")).toBe("B");
    expect(normalizeNote("Fb")).toBe("E");
    expect(normalizeNote("E#")).toBe("F");
    expect(normalizeNote("B#")).toBe("C");
  });

  it("is case-insensitive for both letter and accidental", () => {
    expect(normalizeNote("c#")).toBe("C#");
    expect(normalizeNote("bb")).toBe("A#");
    expect(normalizeNote("BB")).toBe("A#");
    expect(normalizeNote("DB")).toBe("C#");
    expect(normalizeNote("eB")).toBe("D#");
  });

  it("trims whitespace", () => {
    expect(normalizeNote("  Gb ")).toBe("F#");
  });
});

describe("normalizeNotes", () => {
  it("normalizes every note in the list", () => {
    expect(normalizeNotes(["Db", "f", "AB"])).toEqual(["C#", "F", "G#"]);
  });
});
