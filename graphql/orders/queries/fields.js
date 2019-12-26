module.exports = {
  Order: {
    customer: async (parent, args, { loaders: { customerLoader } }) => {
      return await customerLoader.load(parent.id);
    }
  }
};
