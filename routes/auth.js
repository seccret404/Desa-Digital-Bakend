// routes/authRoutes.js

const express = require('express');
const { login, logout } = require('../controllers/authController');
const { validateLogin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/logout', logout);

module.exports = router;
