import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pool from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple health/test route
app.get('/api/test', async (req, res) => {
  try {
    res.json({ message: 'Backend is working!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint: GET /api/status-counts?date=YYYY-MM-DD
// Returns counts per STATUS for the provided date. If date is omitted, returns counts across all dates.
app.get('/api/status-counts', async (req, res) => {
  const date = typeof req.query.date === 'string' ? req.query.date : undefined;

  try {
    let sql = `SELECT STATUS as status, COUNT(*) as count FROM registration_status_history`;
    const params: any[] = [];

    if (date) {
      // Expecting date in YYYY-MM-DD format. The seeded data uses DATE type.
      sql += ` WHERE DATE_CREATED = ?`;
      params.push(date);
    }

    sql += ` GROUP BY STATUS ORDER BY count DESC`;

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error querying status counts:', err);
    res.status(500).json({ error: 'Failed to query status counts' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});