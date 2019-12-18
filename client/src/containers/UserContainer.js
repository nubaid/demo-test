import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS_QUERY } from "../graphql/queries";

const UserContainer = props => {
  const { error, loading, data } = useQuery(GET_USERS_QUERY, {});

  console.log(data);

  return <div></div>;
};

export default UserContainer;
