// models/userModel.js
const bcrypt = require('bcrypt');

const users = [];

const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);
  return user;
};

const getUser = (username) => users.find(user => user.username === username);

module.exports = { addUser, getUser };
