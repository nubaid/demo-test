module.exports = {
  createOrder: async (source, { input }, { models: { Order } }) => {
    try {
      return await Order.create(input);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
