import gql from "graphql-tag";
import { userFragments } from "./fragments";

export const GET_USERS_QUERY = gql`
  query allUsers {
    users {
      ...userInfo
    }
  }
  ${userFragments}
`;
