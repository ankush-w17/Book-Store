const asyncHandler = require('express-async-handler');
const authService = require('../services/authService');


const registerUser = asyncHandler(async (req, res) => {
  try {
    const userData = await authService.registerUser(req.body);
    res.status(201).json(userData);
  } catch (error) {
    if (error.message === 'User already exists') {
      res.status(400);
    } else {
      res.status(400);
    }
    throw error;
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const userData = await authService.loginUser(req.body);
    res.json(userData);
  } catch (error) {
    res.status(401);
    throw error;
  }
});

module.exports = { registerUser, authUser };
