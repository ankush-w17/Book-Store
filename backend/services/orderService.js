const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');
const mockPayment = require('../utils/mockPayment');

const placeOrder = async (userId, address) => {
  const cart = await Cart.findOne({ userId }).populate('items.bookId');

  if (!cart || cart.items.length === 0) {
    throw new Error('No items in cart');
  }

  let totalAmount = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const book = item.bookId;

    const price = book.discountPrice && book.discountPrice > 0 ? book.discountPrice : book.price;

    if (book.quantity < item.quantity) {
      throw new Error(`Not enough stock for ${book.title}`);
    }

    totalAmount += price * item.quantity;
    orderItems.push({
      bookId: book._id,
      quantity: item.quantity,
      price: price,
    });
  }

  const isPaid = await mockPayment(userId, totalAmount);

  if (isPaid) {
    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      address,
      paymentStatus: 'SUCCESS',
    });

    cart.items = [];
    await cart.save();

    for (const item of orderItems) {
      const book = await Book.findById(item.bookId);
      book.quantity -= item.quantity;
      await book.save();
    }

    return order;
  } else {
    throw new Error('Payment failed');
  }
};

const getUserOrders = async (userId) => {
  const orders = await Order.find({ userId }).populate('items.bookId').sort({ createdAt: -1 });
  return orders;
};

module.exports = {
  placeOrder,
  getUserOrders
};
