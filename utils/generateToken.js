const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' });
};

module.exports = generateToken;
