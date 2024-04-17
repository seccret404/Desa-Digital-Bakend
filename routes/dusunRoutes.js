const express = require('express');
const router = express.Router();
const dusunController = require('../controllers/dusun.controllers');

router.get('/dusun', dusunController.findAll);

router.post('/dusun', dusunController.create);

router.put('/dusun/:id', dusunController.update);

router.get('/dusun/:id', dusunController.findById);

router.delete('/dusun/:id', dusunController.delete);

module.exports = router;
