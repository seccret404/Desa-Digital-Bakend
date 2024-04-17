const express = require('express');
const router = express.Router();
const dusunController = require('../controllers/dusun.controllers');

router.get('/', dusunController.findAll);

router.post('/', dusunController.create);

router.put('/:id', dusunController.update);

router.get('/:id', dusunController.findById);

router.delete('/:id', dusunController.delete);

module.exports = router;
