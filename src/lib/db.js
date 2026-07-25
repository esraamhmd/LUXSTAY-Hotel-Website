import { Pool } from "pg";
import fs from "fs";
import path from "path";

// Reuse a single pool across hot-reloads in dev, and across serverless
// invocations where the module stays warm.
const globalForDb = globalThis;

// Neon (and most managed Postgres providers) require SSL. Detect it from the
// connection string so this works both locally (no SSL) and against Neon
// (SSL required) without needing a separate env flag.
const connectionString = process.env.DATABASE_URL;
const requiresSsl =
  connectionString?.includes("neon.tech") ||
  connectionString?.includes("sslmode=require");

export const pool =
  globalForDb.pgPool ||
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    ssl: requiresSsl ? { rejectUnauthorized: false } : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = pool;
}

let migrated = globalForDb.pgMigrated || false;

/**
 * Runs db/schema.sql once per process. Safe to call on every request —
 * CREATE TABLE IF NOT EXISTS makes it a no-op after the first run.
 */
export async function ensureSchema() {
  if (migrated) return;
  const schemaPath = path.join(process.cwd(), "db", "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");
  await pool.query(sql);
  migrated = true;
  globalForDb.pgMigrated = true;
}

/**
 * Convenience query helper — ensures schema exists, then runs the query.
 */
export async function query(text, params) {
  await ensureSchema();
  return pool.query(text, params);
}