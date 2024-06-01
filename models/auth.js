const bcrypt = require('bcrypt');
const { connection } = require('../config/database'); // Mengimpor connection dari config/database.js

const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };

  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO admin (username, password) VALUES (?, ?)', [user.username, user.password], (error, results, fields) => {
      if (error) {
        console.error('Error adding user to database:', error);
        reject(error);
        return;
      }
      console.log('User added to database');
      resolve();
    });
  });
};

const initializeAdmin = async () => {
  await addUser('admin', 'adminpassword'); // Tambahkan admin awal saat database terkoneksi
};

module.exports = { addUser, initializeAdmin };
