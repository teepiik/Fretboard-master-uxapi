const DEV_ORIGINS = ["http://localhost:5173"];

/**
 * Resolve allowed CORS origins.
 * - Production: comma-separated CORS_ORIGIN env var (required, otherwise no origin is allowed).
 * - Otherwise: CORS_ORIGIN if set, else the Vite dev server origin.
 */
export function getAllowedOrigins(env: NodeJS.ProcessEnv = process.env): string[] {
  const fromEnv = (env.CORS_ORIGIN ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (env.NODE_ENV === "production") return fromEnv;
  return fromEnv.length > 0 ? fromEnv : DEV_ORIGINS;
}
