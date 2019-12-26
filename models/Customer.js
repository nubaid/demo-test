"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      firstName: {
        type: DataTypes.STRING(20),
        field: "first_name",
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: { msg: "Please enter first name" }
        }
      },
      lastName: {
        type: DataTypes.STRING(20),
        field: "last_name",
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: { msg: "Please enter last name" }
        }
      },
      email: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: { msg: "Please enter email" },
          isEmail: true
        }
      },
      companyName: {
        type: DataTypes.STRING(50),
        field: "company_name",
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        field: "image"
      },
      address: {
        type: DataTypes.STRING(30)
      },
      city: {
        type: DataTypes.STRING(20)
      },
      state: {
        type: DataTypes.STRING(2)
      },
      zip: {
        type: DataTypes.STRING(10)
      }
    },
    {
      tableName: "customers",
      underscored: true,
      timestamps: true,
      getterMethods: {
        fullName() {
          return this.firstName + " " + this.lastName;
        }
      }
    }
  );
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.hasMany(models.Order, {
      foreignKey: "customerId"
    });
  };
  return Customer;
};
