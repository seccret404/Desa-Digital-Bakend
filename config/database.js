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

connection.promise().then((pool) => {
  pool.query('SELECT 1').then(() => {
    console.log('Connected to database.');

    addUser('admin', 'adminpassword').then(() => {
      console.log('Admin initialized');
    }).catch((err) => {
      console.error('Error initializing admin:', err);
    });
  }).catch((err) => {
    console.error('Database connection failed:', err);
  });
}).catch((err) => {
  console.error('Database connection failed:', err);
});

module.exports = connection;