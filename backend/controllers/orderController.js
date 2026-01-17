const asyncHandler = require('express-async-handler');
const orderService = require('../services/orderService');


const placeOrder = asyncHandler(async (req, res) => {
  const { address } = req.body;
  try {
    const order = await orderService.placeOrder(req.user._id, address);
    res.status(201).json(order);
  } catch (error) {
    if (error.message === 'No items in cart' || error.message.startsWith('Not enough stock') || error.message === 'Payment failed') {
      res.status(400);
    }
    throw error;
  }
});

module.exports = { placeOrder };
