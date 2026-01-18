const Book = require('../models/Book');

const getBooks = async (keyword, page = 1, limit = 25, sort) => {
  const query = keyword
    ? {
        title: {
          $regex: keyword,
          $options: 'i',
        },
      }
    : {};

  let sortOptions = {};
  if (sort === 'price_low') {
    sortOptions = { discountPrice: 1 };
  } else if (sort === 'price_high') {
    sortOptions = { discountPrice: -1 };
  } else if (sort === 'relevance') {
      sortOptions = {}; // Default Mongodb sort
  } else {
      sortOptions = { createdAt: -1 }; // Default new
  }

  const count = await Book.countDocuments({ ...query });
  const books = await Book.find({ ...query })
    .sort(sortOptions)
    .limit(limit)
    .skip(limit * (page - 1));

  return { books, page, pages: Math.ceil(count / limit), total: count };
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
