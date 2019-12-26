module.exports = {
  // this is return single object of customer
  customer: (parent, args, { models: { Customer } }) => {
    return Customer.findByPk(args.id);
  },

  // this is return array of object of customers
  customers: (parent, args, { models }) => {
    const { Customer } = models;

    return Customer.findAll();
  }
};
