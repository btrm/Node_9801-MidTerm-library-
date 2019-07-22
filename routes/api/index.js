const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

router.use('/auth', require('./Auth.route'));

router.use('/profile', auth, require('./User.route'));

router.use('/books', auth, require('./Book.route'));

router.use('/buy', auth, require('./Buy.route'));

router.use('/customer', auth, require('./Customer.route'));



module.exports = router;