const Book = require('../models/Book');

const getBooks = async (keyword) => {
  const query = keyword
    ? {
        title: {
          $regex: keyword,
          $options: 'i',
        },
      }
    : {};

  const books = await Book.find({ ...query }).limit(25);
  return books;
};

const getBookById = async (id) => {
  const book = await Book.findById(id);
  if (book) {
    return book;
  } else {
    throw new Error('Book not found');
  }
};

module.exports = {
  getBooks,
  getBookById,
};
