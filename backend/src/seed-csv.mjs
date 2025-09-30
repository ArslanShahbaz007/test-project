import fs from 'fs';
import path from 'path';
import readline from 'readline';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function createTable() {
  const createSql = `
  CREATE TABLE IF NOT EXISTS registration_status_history (
    REGISTRATION_STATUS_ID BIGINT PRIMARY KEY,
    REGISTRATION_ID BIGINT,
    STATUS VARCHAR(255),
    DATE_CREATED DATE
  );
  `;

  await pool.execute(createSql);
}

function parseDate(mdy) {
  if (!mdy) return null;
  const parts = mdy.split('/').map(p => p.trim());
  if (parts.length !== 3) return null;
  const [m, d, y] = parts;
  const mm = String(m).padStart(2, '0');
  const dd = String(d).padStart(2, '0');
  return `${y}-${mm}-${dd}`;
}

async function seedFromCsv(csvPath) {
  const fileStream = fs.createReadStream(csvPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let header = [];
  const rows = [];

  for await (const line of rl) {
    if (!header.length) {
      header = line.split(',').map(h => h.trim());
      continue;
    }

    // Basic CSV parser handling quoted fields
    const cols = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === ',' && !inQuotes) {
        cols.push(cur);
        cur = '';
        continue;
      }
      cur += ch;
    }
    cols.push(cur);

    const obj = {};
    for (let i = 0; i < header.length; i++) {
      const key = header[i] || `col${i}`;
      obj[key] = (cols[i] ?? '').trim();
    }
    rows.push(obj);
  }

  console.log(`Parsed ${rows.length} rows`);

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query('DELETE FROM registration_status_history');

    const insertSql = `INSERT INTO registration_status_history (REGISTRATION_STATUS_ID, REGISTRATION_ID, STATUS, DATE_CREATED) VALUES (?, ?, ?, ?)`;

    for (const r of rows) {
      const date = parseDate(r.DATE_CREATED);
      await conn.query(insertSql, [r.REGISTRATION_STATUS_ID || null, r.REGISTRATION_ID || null, r.STATUS || null, date]);
    }

    await conn.commit();
    console.log('Seed completed');
  } catch (err) {
    await conn.rollback();
    console.error('Seed failed:', err);
    throw err;
  } finally {
    conn.release();
  }
}

async function main() {
  const csvPath = path.resolve(process.env.CSV_PATH || '/Users/dev/Downloads/TABLES(REGISTRATION STATUS HISTORY).csv');
  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found at', csvPath);
    process.exit(1);
  }

  await createTable();
  await seedFromCsv(csvPath);
  await pool.end();
}

main().catch(err => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
