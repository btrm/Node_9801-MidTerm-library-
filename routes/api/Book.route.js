const express = require('express');
const router = express.Router();

const bookController = require('../../controllers/Book.controller');

router.post('/', bookController.create);
router.get('/', bookController.list);
router.get('/:id', bookController.getBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
