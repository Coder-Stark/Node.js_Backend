const express = require('express');
const { generateInvoice } = require('../controllers/printController');
const router = express.Router();

router.get('/invoice', generateInvoice);

module.exports = router;