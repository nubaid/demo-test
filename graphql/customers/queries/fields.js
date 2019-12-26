module.exports = {
  Customer: {
    orders: async (parent, args, { loaders: { ordersLoader } }) => {
      return await ordersLoader.load(parent.id);
    }
  }
};
