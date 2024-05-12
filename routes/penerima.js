const penerimaBantuanControllers = require('../controllers/penerimaBantuan.controllers');
const express = require('express');
const router = express.Router();

router.get('/penerima-bantuan', penerimaBantuanControllers.findAll);

router.post('/penerima-bantuan', penerimaBantuanControllers.create);

module.exports = router;