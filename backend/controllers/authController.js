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

const googleAuth = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    const userData = await authService.googleLogin(token);
    res.json(userData);
  } catch (error) {
    res.status(401);
    throw new Error('Google authentication failed: ' + error.message);
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await authService.updateUserProfile(req.user._id, req.body);
    res.json(user);
});

module.exports = { registerUser, authUser, googleAuth, updateUserProfile };
