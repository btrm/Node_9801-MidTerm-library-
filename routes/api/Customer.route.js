const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const customerController = require('../../controllers/Customer.controller');

router.use(auth);

router.get('/list', customerController.list);
router.get('/:id', customerController.getCustomerById);

module.exports = router;