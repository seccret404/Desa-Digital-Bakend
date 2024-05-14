const penerimaBantuanControllers = require('../controllers/penerimaBantuan.controllers');
const express = require('express');
const router = express.Router();

router.get('/penerima-bantuan', penerimaBantuanControllers.findAll);
router.get('/penerima-bantuan/:id', penerimaBantuanControllers.findById);
router.post('/penerima-bantuan', penerimaBantuanControllers.create);
router.put('/penerima-bantuan/:id', penerimaBantuanControllers.update);

module.exports = router;
