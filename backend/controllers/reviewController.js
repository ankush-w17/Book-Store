const asyncHandler = require('express-async-handler');
const reviewService = require('../services/reviewService');


const addReview = asyncHandler(async (req, res) => {
  const { rating, comment, bookId } = req.body;
  try {
    const review = await reviewService.addReview(req.user._id, bookId, rating, comment);
    res.status(201).json(review);
  } catch (error) {
    if (error.message === 'Product already reviewed') {
      res.status(400);
    } else if (error.message === 'Book not found') {
      res.status(404);
    }
    throw error;
  }
});


const getReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getReviews(req.params.bookId);
  res.json(reviews);
});

module.exports = { addReview, getReviews };
