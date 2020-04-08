import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_STORES__QUERY = gql`
  query AllStores {
    allStores {
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

const Stores = (props) => {
  const { loading, error, data: storesData } = useQuery(ALL_STORES__QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {storesData.allStores.map((store) => {
        return (
          <div
            key={store._id}
            className="max-w-sm w-full lg:max-w-full lg:flex"
          >
            <div className="cursor-pointer border border-gray-400 p-4 flex flex-col justify-between leading-normal">
              <div className="mb-3">
                <p className="text-sm text-gray-600 flex items-center">
                  {store._id}
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {store.name}
                </div>
              </div>
              <div>
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">
                    {store.author.username}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stores;
