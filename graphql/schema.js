const { makeExecutableSchema } = require("graphql-tools");
const GraphQLJSON = require("graphql-type-json");
const GraphQLUpload = require("graphql-upload");
let resolvers = require("./resolvers");

const typeDefs = `
    scalar JSON
    scalar Upload

  type User {
    id: ID    
    firstName: String
    lastName: String
    password: String
    createdAt: String
    updatedAt: String
  }

  type Order {
    id: ID!
    customer: Customer!
    customerId: Int
    items: JSON
    paymentMode: String
    amount: String
    totalCharges: Float
    createdAt: String
    updatedAt: String
  }

  type Customer {
    id: ID
    firstName: String
    lastName: String
    email: String
    companyName: String
    image: String
    address: String
    city: String
    state: String
    zip: String
    orders: [Order!]
    createdAt: String
    updatedAt: String
  }
  
  input UserInput {
      firstName: String
      lastName: String
      password: String
  }

  input OrderInput {
    customerId: Int
    items: JSON
    paymentMode: String
    totalCharges: Float

  }

  input CustomerInput {
    firstName: String
    lastName: String
    email: String
    companyName: String
    image: Upload
    address: String
    city: String
    state: String
    zip: String

    selectedProducts: JSON
    paymentMode: String

  }

  type RootQuery {
    user(id: ID!): User
    users(page: Int = 0, size: Int = 10): [User!]
    customer(id: ID!): Customer
    customers(page: Int = 0, size: Int = 10): [Customer!]
    order(id: ID!): Order
    orders(page: Int = 0, size: Int = 10): [Order!]
  }

  type RootMutation {
    createCustomer(input: CustomerInput): Customer
    createOrder(input: OrderInput): Order
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`;

resolvers = {
  ...resolvers,
  JSON: GraphQLJSON,
  Upload: GraphQLUpload
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
