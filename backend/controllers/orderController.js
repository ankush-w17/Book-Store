const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');
const mockPayment = require('../utils/mockPayment');

// @desc    Place an order
// @route   POST /api/orders
// @access  Private
const placeOrder = asyncHandler(async (req, res) => {
  const { address } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.bookId');

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('No items in cart');
  }

  // Calculate total and validate stock
  let totalAmount = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const book = item.bookId;
    
    // Use discountPrice if available, otherwise regular price
    // Note: Schema has discountPrice, but default logic should handle if it is 0 or undefined
    const price = book.discountPrice && book.discountPrice > 0 ? book.discountPrice : book.price;

    // Check stock (optional based on requirements, but good practice)
    if (book.quantity < item.quantity) {
        res.status(400);
        throw new Error(`Not enough stock for ${book.title}`);
    }

    totalAmount += price * item.quantity;
    orderItems.push({
      bookId: book._id,
      quantity: item.quantity,
      price: price
    });
  }

  // Mock Payment
  const isPaid = await mockPayment(req.user._id, totalAmount);

  if (isPaid) {
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalAmount,
      address,
      paymentStatus: 'SUCCESS',
    });

    // Clear Cart
    cart.items = [];
    await cart.save();

    // Reduce stock (optional, but realistic)
    for (const item of orderItems) {
        const book = await Book.findById(item.bookId);
        book.quantity -= item.quantity;
        await book.save();
    }

    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error('Payment failed');
  }
});

module.exports = { placeOrder };
