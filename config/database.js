// const mysql = require('mysql2');

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'desa_digital'
// });

// module.exports = connection;
const mysql = require('mysql2');
const { addUser } = require('../models/auth');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
  
  addUser('admin', 'adminpassword').then(() => {
    console.log('Admin initialized');
  }).catch(err => {
    console.error('Error initializing admin:', err);
  });

  connection.end();
});

module.exports = { connection }; // Mengubah ini menjadi objek yang berisi connection
