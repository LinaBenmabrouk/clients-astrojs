import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { mkdirSync } from "node:fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = resolve(
  import.meta.env.SQLITE_DB_PATH || "./data/clients.db"
);
mkdirSync(dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);

export function getClients() {
  return db.prepare(`
    SELECT
      id,
      name,
      email,
      address,
      latitude,
      longitude
    FROM clients
    ORDER BY name
  `).all();
}

export default db;