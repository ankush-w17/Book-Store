const asyncHandler = require('express-async-handler');
const addressService = require('../services/addressService');

const addAddress = asyncHandler(async (req, res) => {
  const address = await addressService.addAddress(req.user._id, req.body);
  res.status(201).json(address);
});

const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await addressService.getAddresses(req.user._id);
  res.json(addresses);
});

const updateAddress = asyncHandler(async (req, res) => {
  const address = await addressService.updateAddress(req.user._id, req.params.id, req.body);
  res.json(address);
});

const deleteAddress = asyncHandler(async (req, res) => {
  const result = await addressService.deleteAddress(req.user._id, req.params.id);
  res.json(result);
});

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
};
