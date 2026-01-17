const Cart = require('../models/Cart');

const getCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate('items.bookId');
  if (cart) {
    return cart;
  } else {
    return { items: [] };
  }
};

const addToCart = async (userId, bookId, quantity) => {
  let cart = await Cart.findOne({ userId });

  if (cart) {
    const itemIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ bookId, quantity });
    }
  } else {
    cart = await Cart.create({
      userId,
      items: [{ bookId, quantity }],
    });
  }

  await cart.save();
  return await Cart.findOne({ userId }).populate('items.bookId');
};

const removeFromCart = async (userId, bookId) => {
  const cart = await Cart.findOne({ userId });

  if (cart) {
    cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);
    await cart.save();
    return await Cart.findOne({ userId }).populate('items.bookId');
  } else {
    throw new Error('Cart not found');
  }
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = [];
    await cart.save();
    return { message: 'Cart cleared' };
  } else {
    return { message: 'Cart already empty' };
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
