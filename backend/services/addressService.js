const Address = require('../models/Address');

const addAddress = async (userId, addressData) => {
  const address = await Address.create({
    userId,
    ...addressData,
  });
  return address;
};

const getAddresses = async (userId) => {
  const addresses = await Address.find({ userId });
  return addresses;
};

const updateAddress = async (userId, addressId, addressData) => {
  const address = await Address.findOne({ _id: addressId, userId });
  if (address) {
    Object.assign(address, addressData);
    const updatedAddress = await address.save();
    return updatedAddress;
  } else {
    throw new Error('Address not found');
  }
};

const deleteAddress = async (userId, addressId) => {
    const result = await Address.findOneAndDelete({ _id: addressId, userId });
    if(result) {
        return { message: 'Address removed' };
    } else {
        throw new Error('Address not found');
    }
};

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress
};
