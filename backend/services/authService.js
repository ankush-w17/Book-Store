const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

const googleLogin = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, sub } = ticket.getPayload();

  let user = await User.findOne({ email });

  if (user) {
    if (!user.googleId) {
      user.googleId = sub;
      await user.save();
    }
  } else {
    // Generate a random password for Google users as one is required by schema/hashing but they won't use it
    const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    user = await User.create({
      name,
      email,
      password: randomPassword, 
      googleId: sub,
    });
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

const updateUserProfile = async (userId, updateData) => {
    const user = await User.findById(userId);
    if (user) {
        user.name = updateData.name || user.name;
        user.email = updateData.email || user.email;
        user.mobile = updateData.mobile !== undefined ? updateData.mobile : user.mobile;
        
        if (updateData.password) {
            user.password = updateData.password;
        }

        const updatedUser = await user.save();
        return {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
            mobile: updatedUser.mobile
        };
    } else {
        throw new Error('User not found');
    }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  updateUserProfile
};
