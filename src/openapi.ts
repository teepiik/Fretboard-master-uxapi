import { z } from "zod";
import {
  AnalyzeSchema,
  AnalyzeResponseSchema,
  ScaleListSchema,
  TuningListSchema,
} from "./schemas/theory.schema";

const ErrorSchema = z
  .object({
    error: z.string(),
    details: z.array(z.unknown()).optional().describe("Validation issues, present on 400 responses"),
  })
  .meta({ id: "ErrorResponse" });

const HealthSchema = z
  .object({
    status: z.literal("ok"),
    uptime: z.number(),
    timestamp: z.string(),
  })
  .meta({ id: "HealthResponse" });

/** Names used in $refs; every schema below is registered in z.globalRegistry via `.meta({ id })`. */
type SchemaName =
  | "ErrorResponse"
  | "HealthResponse"
  | "AnalyzeRequest"
  | "AnalyzeResponse"
  | "ScaleList"
  | "TuningList";

// Referencing the imports keeps them in the module graph so their `.meta()` registration runs.
void [ErrorSchema, HealthSchema, AnalyzeSchema, AnalyzeResponseSchema, ScaleListSchema, TuningListSchema];

const generated = z.toJSONSchema(z.globalRegistry, {
  target: "openapi-3.0",
  uri: (id) => `#/components/schemas/${id}`,
  io: "input",
});

const componentSchemas: Record<string, unknown> = {};
for (const [name, def] of Object.entries(generated.schemas)) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $schema, $id, ...rest } = def as Record<string, unknown>;
  componentSchemas[name] = rest;
}

const ref = (name: SchemaName) => ({ $ref: `#/components/schemas/${name}` });
const json = (name: SchemaName, example?: unknown) => ({
  "application/json": { schema: ref(name), ...(example !== undefined ? { example } : {}) },
});
const errorResponses = {
  "400": { description: "Invalid input", content: json("ErrorResponse") },
  "500": { description: "Internal server error", content: json("ErrorResponse") },
};

export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Fretboard Master UX API",
    version: "1.0.0",
    description:
      "Music theory catalogue (scales, tunings) and note analysis for the Fretboard Master frontend. " +
      "Fretboard rendering is computed client-side from scale intervals and tuning MIDI numbers.",
  },
  paths: {
    "/health": {
      get: {
        operationId: "getHealth",
        summary: "Health check",
        responses: {
          "200": { description: "Service is up", content: json("HealthResponse") },
        },
      },
    },
    "/theory/scales": {
      get: {
        operationId: "listScales",
        summary: "List available scales with their interval formulas",
        responses: {
          "200": { description: "Scale catalogue", content: json("ScaleList") },
        },
      },
    },
    "/theory/tunings": {
      get: {
        operationId: "listTunings",
        summary: "List available guitar tunings",
        responses: {
          "200": { description: "Tuning catalogue", content: json("TuningList") },
        },
      },
    },
    "/theory/analyze": {
      post: {
        operationId: "analyzeNotes",
        summary: "Find chords and scales containing the given notes",
        requestBody: { required: true, content: json("AnalyzeRequest", { notes: ["C", "E", "G"] }) },
        responses: {
          "200": { description: "Matching chords and scales", content: json("AnalyzeResponse") },
          ...errorResponses,
        },
      },
    },
  },
  components: { schemas: componentSchemas },
};
