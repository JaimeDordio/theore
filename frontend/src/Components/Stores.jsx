import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const TEST__REQUEST = gql`
  {
    test
  }
`;

const Stores = (props) => {
  const { loading, error, data } = useQuery(TEST__REQUEST);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.test;
};

export default Stores;
