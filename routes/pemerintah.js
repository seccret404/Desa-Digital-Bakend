const express = require('express');
const router = express.Router();
const pemerintahController = require('../controllers/pemerintah.controllers');

router.get("/pemerintah", pemerintahController.findAll);

router.post('/pemerintah', pemerintahController.create);

module.exports = router;