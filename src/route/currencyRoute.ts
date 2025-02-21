const currencyController = require('../controller/currencyController');

const express = require('express');
const router = express.Router();

router.post('/convert', (currencyController.convert));

export default router;
