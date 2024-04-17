const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');

const app = express();

// Konfigurasi Database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

// Menguji koneksi database sebelum menjalankan server
pool.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) {
    console.error('Unable to connect to the database:', error);
    return; // Jangan menjalankan server jika koneksi database gagal
  }
  console.log('Database connection has been established successfully.');
  // Mulai server hanya jika koneksi database berhasil
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
