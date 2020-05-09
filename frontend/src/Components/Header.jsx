import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import theore_logo from "../images/theore_logo.svg";

const SEARCH_STORE__REQUEST = gql`
  query SearchStore($name: String!) {
    searchStore(name: $name) {
      name
      website
    }
  }
`;

const Header = (props) => {
  const [
    searchStore,
    {
      loading: searchStoreLoading,
      error: searchStoreError,
      data: searchStoreData,
    },
  ] = useLazyQuery(SEARCH_STORE__REQUEST);

  const [searchInputState, setSearchInputState] = useState(null);
  const [searchResultsState, setSearchResultsState] = useState(null);

  useEffect(() => {
    if (searchInputState) {
    searchStore({
        variables: {
          name: searchInputState,
        },
      });
    }
  }, [searchInputState]);

  return (
    <nav className="p-4 bg-gray-100">
      {console.log(searchStoreData)}
      <div className="max-w-screen-lg flex items-center justify-between mx-auto">
        <div className="flex items-center align-start">
          <Link to="/" className="flex items-center">
            <img src={theore_logo} alt="Theore" className="h-8 w-8 mr-2" />
            <span className="font-medium text-black text-base mr-5">
              Theore
            </span>
          </Link>
          <input
            className="bg-white focus:outline-none border border-gray-300 focus:border-gray-500 rounded py-2 px-4 block appearance-none leading-normal"
            type="text"
            placeholder="Search a store"
            id="searchInput"
            onChange={() =>
              setSearchInputState(document.getElementById("searchInput").value)
            }
          />
          <Link
            to="/"
            className="block lg:inline-block text-black text-base hover:text-gray-500 mx-4"
          >
            Home
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            to="/addStore"
            className="bg-transparent hover:bg-gray-300 text-gray-900 text-xs font-medium uppercase py-2 px-4 mx-2 border border-gray-400 hover:border-transparent rounded"
          >
            Add new store
          </Link>
          {localStorage.getItem("userId") &&
          localStorage.getItem("username") &&
          localStorage.getItem("userAuthtoken") ? (
            <>
              <div className="block lg:inline-block text-sm ml-4">
                Hello, {localStorage.getItem("username")}
              </div>

              <div
                className="block mt-4 lg:inline-block lg:mt-0 text-sm underline hover:text-gray-600 ml-2 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("userId");
                  localStorage.removeItem("username");
                  localStorage.removeItem("userAuthtoken");
                  props.history.push(`/`);
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gray-900 hover:bg-gray-700 text-white text-xs font-medium uppercase py-2 px-4 border border-black hover:border-transparent rounded ml-2"
            >
              Log in | Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
