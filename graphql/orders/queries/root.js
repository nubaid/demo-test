module.exports = {
  // this is return single object of order
  order: (parent, args, { models: { Order } }) => {
    return Order.findByPk(args.id);
  },

  // this is return array of object of orders
  orders: (parent, args, { models }) => {
    const { Order } = models;
    console.log("here i am");

    return Order.findAll();
  }
};
