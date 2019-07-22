const express = require('express');
const router = express.Router();

const userController = require('../../controllers/User.controller');

router.get('/', userController.userProfile);
router.put('/:id', userController.updateInfo);

module.exports = router;
