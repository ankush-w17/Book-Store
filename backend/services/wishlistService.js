const Wishlist = require('../models/Wishlist');

const getWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ userId }).populate('items.bookId');
  if (!wishlist) {
      return { items: [] };
  }
  return wishlist;
};

const addToWishlist = async (userId, bookId) => {
  let wishlist = await Wishlist.findOne({ userId });

  if (wishlist) {
      // Check if item exists
      const itemExists = wishlist.items.some(item => item.bookId.toString() === bookId);
      if (!itemExists) {
          wishlist.items.push({ bookId });
          await wishlist.save();
      }
  } else {
      wishlist = await Wishlist.create({
          userId,
          items: [{ bookId }]
      });
  }
  return await Wishlist.findOne({ userId }).populate('items.bookId');
};

const removeFromWishlist = async (userId, bookId) => {
  const wishlist = await Wishlist.findOne({ userId });

  if (wishlist) {
      wishlist.items = wishlist.items.filter(item => item.bookId.toString() !== bookId);
      await wishlist.save();
      return await Wishlist.findOne({ userId }).populate('items.bookId');
  } else {
      throw new Error('Wishlist not found');
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
