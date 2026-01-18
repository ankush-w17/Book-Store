const asyncHandler = require('express-async-handler');
const bookService = require('../services/bookService');


const getBooks = asyncHandler(async (req, res) => {
  const { keyword, page, limit, sort } = req.query;
  const data = await bookService.getBooks(keyword, Number(page) || 1, Number(limit) || 25, sort);
  res.json(data);
});


const getBookById = asyncHandler(async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    if (error.message === 'Book not found') {
      res.status(404);
    }
    throw error;
  }
});

module.exports = { getBooks, getBookById };
