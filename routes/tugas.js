const express = require('express');
const router = express.Router();
const tugasController = require('../controllers/tugaswewenang.controllers')

router.get('/tugas', tugasController.findAll);
router.post('/tugas', tugasController.create);
router.get('/tugas/:id', tugasController.findById);
router.put('/tugas/:id', tugasController.update);
module.exports = router;