import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import StoresListItem from "./StoreListItem";

const ALL_STORES__QUERY = gql`
  query getAllStores {
    getAllStores {
      _id
      name
      website
      dateAdded
      rating
      author {
        _id
        username
      }
    }
  }
`;

const StoresList = (props) => {
  const { onStoreClick } = props;

  const {
    loading: allStoresLoading,
    error: allStoresError,
    data: storesData,
  } = useQuery(ALL_STORES__QUERY);

  if (allStoresLoading) return <p>Loading...</p>;
  if (allStoresError) return <p>Error :(</p>;

  return (
    <div className="border border-gray-400 shadow-sm rounded-md overflow-hidden flex flex-col-reverse">
      {storesData.getAllStores.map((store) => {
        return (
          <StoresListItem
            key={store._id}
            store={store}
            onStoreClick={onStoreClick}
          />
        );
      })}
    </div>
  );
};

export default StoresList;
