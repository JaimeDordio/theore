import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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

const Stores = (props) => {
  const { loading, error, data: storesData } = useQuery(ALL_STORES__QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {storesData.getAllStores.map((store) => {
        return (
          <div className="flex flex-col bg-white px-8 py-6 max-w-sm my-10 rounded-lg shadow-lg" key={store._id}>
            <div className="flex justify-start items-center">
              <a
                className="px-2 py-1 bg-gray-600 text-xs text-green-100 rounded"
                href={store.website}
              >
                {store.website}
              </a>
            </div>
            <div className="mt-4">
              <a className="text-base text-gray-700 font-medium" href="#">
                {store.name}
              </a>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <a className="text-gray-700 text-sm" href="#">
                  {store.author.username}
                </a>
              </div>
              <span className="font-light text-sm text-gray-600">
                {store.dateAdded}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stores;
