import gql from "graphql-tag";

export const userFragments = gql`
  fragment userInfo on User {
    id
    firstName
    lastName
    password
    createdAt
    updatedAt
  }
`;
