import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import axios from "axios";

const REMOVE_STORE__REQUEST = gql`
  mutation RemoveStore($storeId: ID!, $userId: ID!, $userToken: ID!) {
    removeStore(_id: $storeId, author: $userId, token: $userToken)
  }
`;

const StoreDetail = (props) => {
  const { _id, name, website, author, dateAdded } = props.store;
  const { onStoreClick } = props;

  const [
    removeStore,
    {
      loading: removeStoreLoading,
      error: removeStoreError,
      data: removeStoreData,
    },
  ] = useMutation(REMOVE_STORE__REQUEST);

  const [responseUrlState, setResponseUrlState] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.apiflash.com/v1/urltoimage", {
        params: {
          access_key: process.env.REACT_APP_APIFLASH_KEY,
          format: "png",
          url: website,
        },
      })
      .then((response) => {
        setResponseUrlState(response.request.responseURL);
      })
      .catch((error) => console.log("Error on screenshot request --", error));
  }, [props.store]);

  const onStoreDeleteHandler = async () => {
    await removeStore({
      variables: {
        storeId: _id,
        userId: localStorage.getItem("userId"),
        userToken: localStorage.getItem("userAuthtoken"),
      },
    }).catch((e) => {
      console.log("Remove store error", e);
    });

    window.location.href = "/";
  };

  return (
    <div>
      <div
        className="absolute bg-gray-700 opacity-50 w-screen h-screen"
        onClick={() => onStoreClick(null)}
      ></div>
      <div
        className="fixed bg-white m-auto w-full md:w-5/6 lg:w-3/4 rounded-md overflow-hidden flex flex-col md:flex-row justify-between"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -30%)",
        }}
      >
        <div className="flex-col p-12 w-4/6">
          <div className="flex-col mb-16">
            <div className=" text-3xl leading-9 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-5">
              {name}
            </div>
            <div>Author: {author.username}</div>
          </div>

          <div className="w-9/12 h-auto">
            {responseUrlState ? (
              <img className="w-full h-auto" src={responseUrlState} alt="" />
            ) : null}
          </div>
        </div>

        <div className="flex-col p-12 bg-gray-200 w-full md:w-2/6">
          <div
            className="flex justify-start h-auto p-3 border-solid border-gray-400 border-2 justify-start shadow rounded-md cursor-pointer bg-white hover:bg-gray-400"
            onClick={() => window.open(website)}
          >
            <div className="h-8 w-8 mr-3 my-auto">
              <svg
                height="100%"
                width="100%"
                version="1.1"
                viewBox="0 0 17 17"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g />
                <path
                  d="M8.516 0c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.814-8.5-8.5-8.5zM1.041 9h2.937c0.044 1.024 0.211 2.031 0.513 3h-2.603c-0.481-0.906-0.776-1.923-0.847-3zM3.978 8h-2.937c0.071-1.077 0.366-2.094 0.847-3h2.6c-0.301 0.969-0.467 1.976-0.51 3zM5.547 5h5.896c0.33 0.965 0.522 1.972 0.569 3h-7.034c0.046-1.028 0.239-2.035 0.569-3zM4.978 9h7.035c-0.049 1.028-0.241 2.035-0.572 3h-5.891c-0.331-0.965-0.524-1.972-0.572-3zM13.013 9h2.978c-0.071 1.077-0.366 2.094-0.847 3h-2.644c0.302-0.969 0.469-1.976 0.513-3zM13.013 8c-0.043-1.024-0.209-2.031-0.51-3h2.641c0.48 0.906 0.775 1.923 0.847 3h-2.978zM14.502 4h-2.354c-0.392-0.955-0.916-1.858-1.55-2.7 1.578 0.457 2.938 1.42 3.904 2.7zM9.074 1.028c0.824 0.897 1.484 1.9 1.972 2.972h-5.102c0.487-1.071 1.146-2.073 1.97-2.97 0.199-0.015 0.398-0.030 0.602-0.030 0.188 0 0.373 0.015 0.558 0.028zM6.383 1.313c-0.629 0.838-1.151 1.737-1.54 2.687h-2.314c0.955-1.267 2.297-2.224 3.854-2.687zM2.529 13h2.317c0.391 0.951 0.915 1.851 1.547 2.689-1.561-0.461-2.907-1.419-3.864-2.689zM7.926 15.97c-0.826-0.897-1.488-1.899-1.978-2.97h5.094c-0.49 1.072-1.152 2.075-1.979 2.972-0.181 0.013-0.363 0.028-0.547 0.028-0.2 0-0.395-0.015-0.59-0.030zM10.587 15.703c0.636-0.842 1.164-1.747 1.557-2.703h2.358c-0.968 1.283-2.332 2.247-3.915 2.703z"
                  fill="#a0aec0"
                />
              </svg>
            </div>
            <div className="flex-col justify-between h-10">
              <div className="text-sm text-black m-0">Website</div>
              <div className="text-xs text-gray-600 m-0">
                {website.replace(/^https?\:\/\//i, "")} ⎋
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {localStorage.getItem("userId") === author._id ? (
            <div>
              <button
                type="submit"
                className="mr-5 text-sm cursor-pointer bg-red-600 hover:bg-red-500 shadow-xl px-5 py-2 inline-block text-red-100 hover:text-white rounded"
                onClick={() => onStoreDeleteHandler()}
              >
                Delete
              </button>
              <button
                type="submit"
                className="mr-5 text-sm cursor-pointer bg-blue-600 hover:bg-blue-500 shadow-xl px-5 py-2 inline-block text-blue-100 hover:text-white rounded"
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
