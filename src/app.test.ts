import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app";

describe("POST /theory/analyze", () => {
  it("returns chords and scales for valid notes (happy path)", async () => {
    const res = await request(app)
      .post("/theory/analyze")
      .send({ notes: ["C", "E", "G"] });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.input).toEqual(["C", "E", "G"]);
    expect(res.body.chords).toContain("C Major");
    expect(Array.isArray(res.body.scales)).toBe(true);
    expect(res.body.scales.map((s: { name: string }) => s.name)).toContain("C Major");
  });

  it("returns 400 with Zod issues for an invalid note", async () => {
    const res = await request(app)
      .post("/theory/analyze")
      .send({ notes: ["C", "H"] });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid input");
    expect(Array.isArray(res.body.details)).toBe(true);
    expect(res.body.details.length).toBeGreaterThan(0);
    expect(res.body.details[0]).toMatchObject({ path: ["notes", 1] });
    expect(res.body.details[0].message).toMatch(/Invalid note/);
  });

  it("returns 400 when notes is empty", async () => {
    const res = await request(app).post("/theory/analyze").send({ notes: [] });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid input");
    expect(res.body.details[0]).toMatchObject({ code: "too_small", path: ["notes"] });
  });

  it("returns 400 when body is missing notes", async () => {
    const res = await request(app).post("/theory/analyze").send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid input");
  });

  it("returns 400 JSON for a malformed JSON body", async () => {
    const res = await request(app)
      .post("/theory/analyze")
      .set("Content-Type", "application/json")
      .send("{ not json");

    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(typeof res.body.error).toBe("string");
  });

  it("normalizes enharmonic flats to sharps", async () => {
    const res = await request(app)
      .post("/theory/analyze")
      .send({ notes: ["Db", "F", "Ab"] });

    expect(res.status).toBe(200);
    expect(res.body.input).toEqual(["C#", "F", "G#"]);
    expect(res.body.chords).toContain("C# Major");
  });

  it("normalizes mixed-case input including uppercase flats", async () => {
    const res = await request(app)
      .post("/theory/analyze")
      .send({ notes: ["BB", "d", "f"] });

    expect(res.status).toBe(200);
    expect(res.body.input).toEqual(["A#", "D", "F"]);
    expect(res.body.chords).toContain("A# Major");
  });

  it("treats enharmonic spellings as equivalent", async () => {
    const [flat, sharp] = await Promise.all([
      request(app).post("/theory/analyze").send({ notes: ["Bb", "D", "F"] }),
      request(app).post("/theory/analyze").send({ notes: ["A#", "D", "F"] }),
    ]);

    expect(flat.status).toBe(200);
    expect(sharp.status).toBe(200);
    expect(flat.body).toEqual(sharp.body);
  });
});

describe("GET /health", () => {
  it("returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.uptime).toBe("number");
  });
});

describe("theory catalogue", () => {
  it("GET /theory/scales lists scales with ids and intervals", async () => {
    const res = await request(app).get("/theory/scales");
    expect(res.status).toBe(200);
    expect(res.headers["cache-control"]).toMatch(/max-age/);
    expect(res.body.scales.map((s: { id: string }) => s.id)).toContain("natural-minor");
    expect(res.body.scales[0]).toMatchObject({ id: "major", name: "Major", intervals: [0, 2, 4, 5, 7, 9, 11] });
  });

  it("GET /theory/tunings lists tunings with MIDI numbers", async () => {
    const res = await request(app).get("/theory/tunings");
    expect(res.status).toBe(200);
    expect(res.body.tunings[0]).toMatchObject({ id: "standard", midi: [40, 45, 50, 55, 59, 64] });
  });
});

describe("OpenAPI", () => {
  it("serves the spec at /openapi.json", async () => {
    const res = await request(app).get("/openapi.json");
    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe("3.0.3");
    expect(res.body.paths["/theory/analyze"].post.operationId).toBe("analyzeNotes");
    expect(res.body.paths["/theory/scales"].get.operationId).toBe("listScales");
    expect(res.body.paths["/health"].get.operationId).toBe("getHealth");
    expect(Object.keys(res.body.components.schemas)).toEqual(
      expect.arrayContaining(["Scale", "ScaleList", "Tuning", "ScaleId", "NoteName", "ErrorResponse"]),
    );
  });

  it("serves Swagger UI at /docs", async () => {
    const res = await request(app).get("/docs/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("swagger-ui");
  });
});

describe("unknown routes", () => {
  it("returns a JSON 404", async () => {
    const res = await request(app).get("/nope");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not found", path: "/nope" });
  });
});

describe("CORS", () => {
  it("allows the Vite dev origin by default", async () => {
    const res = await request(app).get("/health").set("Origin", "http://localhost:5173");
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
  });

  it("does not echo an unknown origin", async () => {
    const res = await request(app).get("/health").set("Origin", "https://evil.example");
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
