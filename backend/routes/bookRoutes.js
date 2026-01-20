const express = require('express');
const router = express.Router();
const { getBooks, getBookById } = require('../controllers/bookController');

const cache = require('../middlewares/cacheMiddleware');

router.get('/', cache(300), getBooks);
router.get('/:id', cache(600), getBookById);

module.exports = router;
