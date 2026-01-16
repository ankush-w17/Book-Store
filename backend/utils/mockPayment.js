const mockPayment = (userId, amount) => {
  return new Promise((resolve, reject) => {
    // Simulate delay
    setTimeout(() => {
      console.log(`Payment successful for user: ${userId}, Amount: ${amount}`);
      resolve(true); // Always success for now
    }, 1000);
  });
};

module.exports = mockPayment;
