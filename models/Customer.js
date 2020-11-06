"use strict";


/**
 * @swagger
 * definitions:
 * Customer:
 * type: object
 * properties: 
 * firstName:
 * type: string
 * lastName: 
 * type: string
 * email:
 * type: string
 * companyName:
 * type: string
 * image: 
 * type: string
 * address:
 * type: string
 * city: 
 * type: string 
 * state:
 * type: string 
 * zip:
 * type: string 
 * responses:
 * '200':
 * description: Customer fetch successfully
 * '401': 
 * description: not fatch bad request
 */
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
