const bcrypt = require('bcrypt');
const connection = require('../config');

const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  // Simpan ke tabel 'users'
  // Tulis query untuk menyimpan data ke tabel 'users'
  connection.query('INSERT INTO admin (username, password) VALUES (?, ?)', [user.username, user.password], (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log('User added to database');
  });

  return user;
};

const initializeAdmin = async () => {
  await addUser('desaku', 'desaupdate'); // Tambahkan admin awal saat database terkoneksi
};

module.exports = { addUser, initializeAdmin };
