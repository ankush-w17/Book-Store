const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment, bookId } = req.body;

  const book = await Book.findById(bookId);

  if (book) {
    const alreadyReviewed = await Review.findOne({
      userId: req.user._id,
      bookId: bookId,
    });

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = await Review.create({
      userId: req.user._id,
      bookId,
      rating: Number(rating),
      comment,
    });

    // Recalculate average rating
    const reviews = await Review.find({ bookId });
    book.averageRating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await book.save();

    res.status(201).json(review);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Get reviews for a book
// @route   GET /api/reviews/:bookId
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'name');
  res.json(reviews);
});

module.exports = { addReview, getReviews };
