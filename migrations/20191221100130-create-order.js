"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        field: "customer_id",
        allowNull: false
      },
      items: {
        type: Sequelize.JSON,
        field: "items"
      },
      paymentMode: {
        type: Sequelize.STRING(20),
        field: "payment_mode",
        allowNull: true
      },
      totalCharges: {
        type: Sequelize.FLOAT,
        field: "total_charges"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Orders");
  }
};
