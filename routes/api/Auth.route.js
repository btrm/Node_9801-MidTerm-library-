const express = require('express');
const router = express.Router();

const authController = require('../../controllers/Auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
//router.get('/check', authController.check);
//router.get('/logout', authController.logout);

module.exports = router;
