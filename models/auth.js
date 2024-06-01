const bcrypt = require('bcrypt');
const connection = require('../config/database');

const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };

  connection.promise().then((pool) => {
    pool.query('INSERT INTO admin (username, password) VALUES (?, ?)', [user.username, user.password], (error, results, fields) => {
      if (error) {
        console.error('Error adding user to database:', error);
        return;
      }
      console.log('User added to database');
    });
  }).catch((error) => {
    console.error('Error getting database connection:', error);
  });

  return user;
};

const initializeAdmin = async () => {
  await addUser('admin', 'adminpassword'); // Tambahkan admin awal saat database terkoneksi
};
module.exports = { addUser, initializeAdmin };
