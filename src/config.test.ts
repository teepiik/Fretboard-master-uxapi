import { describe, it, expect } from "vitest";
import { getAllowedOrigins } from "./config";

describe("getAllowedOrigins", () => {
  it("defaults to the Vite dev origin outside production", () => {
    expect(getAllowedOrigins({})).toEqual(["http://localhost:5173"]);
  });

  it("parses a comma-separated CORS_ORIGIN list", () => {
    expect(
      getAllowedOrigins({ CORS_ORIGIN: "https://a.example, https://b.example ,," }),
    ).toEqual(["https://a.example", "https://b.example"]);
  });

  it("allows nothing in production when CORS_ORIGIN is unset", () => {
    expect(getAllowedOrigins({ NODE_ENV: "production" })).toEqual([]);
  });
});
