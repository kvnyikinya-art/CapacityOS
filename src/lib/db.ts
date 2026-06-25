/**
 * CapacityOS Database Client
 * 
 * Wrapper around the `team-db` CLI for Turso/SQLite database access.
 * All queries are executed via `team-db` to ensure sync with the team's shared database.
 * 
 * IMPORTANT: Only use this client - never use sqlite3 directly.
 */

import { execSync } from "child_process";

export interface DbResult {
  [key: string]: unknown;
}

/**
 * Execute a single SQL statement via team-db CLI.
 * Returns parsed JSON array of results.
 */
export function query(sql: string): DbResult[] {
  try {
    const output = execSync(`team-db "${sql.replace(/"/g, '\\"')}"`, {
      encoding: "utf-8",
      timeout: 30000,
    });
    return JSON.parse(output.trim() || "[]");
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * Execute a single SQL statement (for INSERT/UPDATE/DELETE).
 * Returns the parsed JSON result.
 */
export function execute(sql: string): DbResult[] {
  return query(sql);
}

/**
 * Get a single record by ID from a table.
 */
export function getById(table: string, id: string): DbResult | null {
  const results = query(
    `SELECT * FROM ${table} WHERE id = '${id.replace(/'/g, "''")}'`
  );
  return results.length > 0 ? results[0] : null;
}

/**
 * List all records from a table with optional filtering.
 */
export function list(
  table: string,
  filters: Record<string, string> = {},
  orderBy = "created_at DESC",
  limit = 100
): DbResult[] {
  const whereClauses = Object.entries(filters)
    .map(([key, value]) => `${key} = '${value.replace(/'/g, "''")}'`)
    .join(" AND ");

  const where = whereClauses ? `WHERE ${whereClauses}` : "";
  return query(
    `SELECT * FROM ${table} ${where} ORDER BY ${orderBy} LIMIT ${limit}`
  );
}