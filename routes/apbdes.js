const express = require('express');
const router = express.Router();
const anggaranController = require('../controllers/apbdes.controllers')

router.get('/anggaran', anggaranController.findAll)
router.get('/anggaran/:id', anggaranController.findById)
router.post('/anggaran', anggaranController.create)
router.put('/anggaran/:id', anggaranController.update)

module.exports = router;