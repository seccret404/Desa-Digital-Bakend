// models/userModel.js
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// Konfigurasi koneksi ke basis data
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Membuat tabel admin jika belum ada
const initializeDatabase = () => {
  connection.query(`
    CREATE TABLE IF NOT EXISTS admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      password VARCHAR(255)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.stack);
    } else {
      console.log('Table \`admin\` is ready.');
    }
  });
};

// Fungsi untuk menambahkan pengguna ke tabel admin
const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO admin (username, password) VALUES (?, ?)`,
      [username, hashedPassword],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, username, password: hashedPassword });
        }
      }
    );
  });
};

// Fungsi untuk mendapatkan pengguna berdasarkan username
const getUser = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM admin WHERE username = ?`,
      [username],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

// Fungsi untuk inisialisasi pengguna awal
const initializeUsers = async () => {
  try {
    await addUser('desaku', 'desaupdate');
    console.log('User initialized');
  } catch (error) {
    console.error('Error initializing user:', error);
  }
};

// Inisialisasi basis data saat modul dimuat
initializeDatabase();

module.exports = { addUser, getUser, initializeUsers };
