const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agenda.controllers');

router.get("/agenda",agendaController.findAll);
router.get("/agenda/:id",agendaController.findById);
router.put("/agenda/:id",agendaController.update);
router.post("/agenda", agendaController.create);

module.exports = router;