const asyncHandler = require('express-async-handler');
const wishlistService = require('../services/wishlistService');

const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.user._id);
  res.json(wishlist);
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const wishlist = await wishlistService.addToWishlist(req.user._id, bookId);
  res.status(201).json(wishlist);
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.removeFromWishlist(req.user._id, req.params.bookId);
  res.json(wishlist);
});

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
