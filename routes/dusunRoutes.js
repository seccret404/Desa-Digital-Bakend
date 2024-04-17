const express = require('express');
const router = express.Router();
const dusunController = require('../controllers/dusun.controllers');

// Retrieve all Dusuns
router.get('/', dusunController.findAll);

// Create a new Dusun
router.post('/', dusunController.create);

module.exports = router;
