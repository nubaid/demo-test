import gql from "graphql-tag";

export const GET_CUSTOMERS_QUERY = gql`
  query allCustomers {
    customers {
      id
      firstName
      lastName
      companyName
      image
      email
      address
      city
      state
      zip
      orders {
        id
        items
        totalCharges
        paymentMode
      }
      createdAt
      updatedAt
    }
  }
`;
