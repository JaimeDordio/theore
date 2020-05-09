import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import cloneDeep from "clone-deep";

import ErrorPill from "../Utils/Components/ErrorPill";

const ADD_STORE__REQUEST = gql`
  mutation AddStore(
    $name: String!
    $website: String!
    $author: ID!
    $token: ID!
  ) {
    addStore(name: $name, website: $website, author: $author, token: $token) {
      _id
      name
      website
      dateAdded
      rating
      author {
        username
      }
    }
  }
`;

const AddStore = (props) => {
  const [
    addStore,
    { loading: addStoreLoading, error: addStoreError, data: addStoreData },
  ] = useMutation(ADD_STORE__REQUEST);

  const [loginState, setLoginState] = useState(null);
  const [addStoreDataState, setAddStoreDataState] = useState({
    storeName: "",
    website: "",
  });

  const localStorageObj = {
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    userAuthtoken: localStorage.getItem("userAuthtoken"),
  };

  useEffect(() => {
    
    if (
      localStorageObj.userId &&
      localStorageObj.username &&
      localStorageObj.userAuthtoken
    ) {
      setLoginState(true);
    } else setLoginState(false);
  });

  const onSubmitHandler = async () => {
    console.log("[AddStore.jsx] onSubmitHandler");
    const clonedState = cloneDeep(addStoreDataState);

    clonedState.storeName = document.getElementById("storeNameInput").value;
    clonedState.website = document.getElementById("storeUrlInput").value;
    setAddStoreDataState(clonedState);

    if (loginState) {
      await addStore({
        variables: {
          name: clonedState.storeName,
          website: clonedState.website,
          author: localStorageObj.userId,
          token: localStorageObj.userAuthtoken
        },
      }).catch((e) => {
        console.log("Add Store error", e);
      });
    } else {
      props.history.push(`/login`);
    }
  };

  return (
    <div className="container max-w-full mx-auto md:py-24 px-6">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="md:mt-6">
              <div className="text-center font-semibold text-black">
                Add a new store
              </div>
              <div className="text-center font-base text-black">
                Enter the details
              </div>
              <form
                className="mt-8"
                onSubmit={(event) => {
                  event.preventDefault(); 
                  onSubmitHandler();
                }}
              >
                <div className="mx-auto max-w-lg ">
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">
                      Store name
                    </span>
                    <input
                      placeholder="Apple"
                      type="text"
                      id="storeNameInput"
                      className="text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Website</span>
                    <input
                      placeholder="apple.com"
                      type="url"
                      id="storeUrlInput"
                      className="text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <button
                    className="mt-8 text-base font-medium
                bg-gray-800 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                    type="submit"
                  >
                    Add store
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStore;
