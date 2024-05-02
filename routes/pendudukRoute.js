const express = require('express');
const router = express.Router();
const penduduk = require('../controllers/penduduk.controllers');

router.get("/penduduk", penduduk.findAll);

router.post("/penduduk", penduduk.create);
router.get("/penduduk/:id",penduduk.findById);
router.put("/penduduk/:id",penduduk.update);

module.exports = router;