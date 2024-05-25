const express = require('express');
const router = express.Router();
const bantuanController = require('../controllers/bantuan.controllers');
router.get("/bantuan",bantuanController.findAll);
router.post("/bantuan", bantuanController.create);
router.delete('/bantuan/:id', bantuanController.delete);


module.exports = router;