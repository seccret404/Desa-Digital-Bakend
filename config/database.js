// const mysql = require('mysql2');

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'desa_digital'
// });

// module.exports = connection;
const mysql = require('mysql2');
const { initializeAdmin } = require('../models/auth');

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

connection.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
  initializeAdmin().then(() => {
    console.log('Admin initialized');
  }).catch(err => {
    console.error('Error initializing admin:', err);
  });
  connection.release();
});

module.exports = connection;
