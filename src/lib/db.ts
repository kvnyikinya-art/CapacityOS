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
    const escapedSql = sql.replace(/"/g, '\\"');
    const output = execSync(`team-db "${escapedSql}"`, {
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
 * Execute a single SQL INSERT/UPDATE/DELETE.
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
 * Get a single record by a field value.
 */
export function getByField(table: string, field: string, value: string): DbResult | null {
  const results = query(
    `SELECT * FROM ${table} WHERE ${field} = '${value.replace(/'/g, "''")}' LIMIT 1`
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