const express = require('express');
const router = express.Router();
const organisasiController = require("../controllers/organisasi.controllers");


router.get("/organisasi", organisasiController.findAll);

router.post("/organisasi", organisasiController.create);

module.exports = router;