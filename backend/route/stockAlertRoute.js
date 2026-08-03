const express = require('express');

const router = express.Router();

const { createStockAlert } = require('../controller/stockAlertController');

router.post('/', createStockAlert);

module.exports = router;
