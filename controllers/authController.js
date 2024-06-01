const bcrypt = require('bcrypt');
const { getUser } = require('../models/auth');
const generateToken = require('../utils/generateToken');

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username); // Menunggu hasil dari getUser

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = generateToken(user);
  // Simpan token di sisi klien (misalnya, dalam cookie)
  res.cookie('token', token, { httpOnly: true });
  return res.status(200).json({ message: 'Login successful', token });
};

const logout = (req, res) => {
  // Hapus token dari sisi klien
  // Contoh jika menggunakan cookie:
  res.clearCookie('token'); // Hapus token dari cookie
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = { login, logout };
