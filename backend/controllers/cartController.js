const asyncHandler = require('express-async-handler');
const cartService = require('../services/cartService');


const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  res.json(cart);
});


const addToCart = asyncHandler(async (req, res) => {
  const { bookId, quantity } = req.body;
  const cart = await cartService.addToCart(req.user._id, bookId, quantity);
  res.json(cart);
});


const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const cart = await cartService.removeFromCart(req.user._id, req.params.bookId);
    res.json(cart);
  } catch (error) {
    if (error.message === 'Cart not found') {
      res.status(404);
    }
    throw error;
  }
});


const clearCart = asyncHandler(async (req, res) => {
  const result = await cartService.clearCart(req.user._id);
  res.json(result);
});

module.exports = { getCart, addToCart, removeFromCart, clearCart };
