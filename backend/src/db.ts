import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'jdbc:mysql://database-1.cv88ekeeehlw.eu-north-1.rds.amazonaws.com:3306/testdb',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Ranainfast1.',
  database: process.env.DB_NAME || 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

export default pool;
