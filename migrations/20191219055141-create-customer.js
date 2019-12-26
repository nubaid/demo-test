"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(20),
        field: "first_name",
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(20),
        field: "last_name",
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false
      },
      companyName: {
        type: Sequelize.STRING(50),
        field: "company_name",
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        field: "image"
      },
      address: {
        type: Sequelize.STRING(30)
      },
      city: {
        type: Sequelize.STRING(20)
      },
      state: {
        type: Sequelize.STRING(2)
      },
      zip: {
        type: Sequelize.STRING(10)
      },
      createdAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: Sequelize.DATE,
        field: "created_at"
      },
      updatedAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: Sequelize.DATE,
        field: "updated_at"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("customers");
  }
};
