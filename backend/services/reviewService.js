const Review = require('../models/Review');
const Book = require('../models/Book');

const addReview = async (userId, bookId, rating, comment) => {
  const book = await Book.findById(bookId);

  if (book) {
    const alreadyReviewed = await Review.findOne({
      userId: userId,
      bookId: bookId,
    });

    if (alreadyReviewed) {
      throw new Error('Product already reviewed');
    }

    const review = await Review.create({
      userId: userId,
      bookId,
      rating: Number(rating),
      comment,
    });

    const reviews = await Review.find({ bookId });
    book.averageRating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await book.save();

    return review;
  } else {
    throw new Error('Book not found');
  }
};

const getReviews = async (bookId) => {
  const reviews = await Review.find({ bookId }).populate('userId', 'name');
  return reviews;
};

module.exports = {
  addReview,
  getReviews,
};
