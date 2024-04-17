const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agenda.controllers');

router.get("/agenda",agendaController.findAll);

router.post('/agenda', agendaController.create);

module.exports = router;