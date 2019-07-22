const express = require('express');
const router = express.Router();

const buyController = require('../../controllers/Order.controller');

router.post('/', buyController.buy);

module.exports = router;
