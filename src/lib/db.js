import { Pool } from "pg";
import fs from "fs";
import path from "path";


const globalForDb = globalThis;


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

export async function ensureSchema() {
  if (migrated) return;
  const schemaPath = path.join(process.cwd(), "db", "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");
  await pool.query(sql);
  migrated = true;
  globalForDb.pgMigrated = true;
}


export async function query(text, params) {
  await ensureSchema();
  return pool.query(text, params);
}