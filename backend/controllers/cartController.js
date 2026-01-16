const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.bookId');
  if (cart) {
    res.json(cart);
  } else {
    res.json({ items: [] });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { bookId, quantity } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });

  if (cart) {
    // Check if product exists in cart
    const itemIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId);

    if (itemIndex > -1) {
      // Product exists, update quantity
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      // Product does not exist, push new item
      cart.items.push({ bookId, quantity });
    }
  } else {
    // No cart for user, create new cart
    cart = await Cart.create({
      userId: req.user._id,
      items: [{ bookId, quantity }],
    });
  }

  await cart.save();
  const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.bookId');
  res.json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:bookId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (cart) {
    cart.items = cart.items.filter((item) => item.bookId.toString() !== req.params.bookId);
    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.bookId');
    res.json(updatedCart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (cart) {
    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } else {
    res.json({ message: 'Cart already empty' });
  }
});

module.exports = { getCart, addToCart, removeFromCart, clearCart };
