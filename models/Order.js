"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      customerId: {
        type: DataTypes.INTEGER,
        field: "customer_id",
        allowNull: false,
        validate: { isInt: true }
      },
      items: {
        type: DataTypes.JSON,
        field: "items"
      },
      paymentMode: {
        type: DataTypes.STRING(20),
        field: "payment_mode",
        allowNull: true
      },
      totalCharges: {
        type: DataTypes.FLOAT,
        field: "total_charges"
      }
    },
    {}
  );
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Customer, {
      foreignKey: "customerId"
    });
  };
  return Order;
};
