// import gql to define GraphQL Query
import gql from "graphql-tag";

/*************create mutation**************/
export const CREATE_CUSTOMER_MUTATION = gql`
  mutation createCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
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
