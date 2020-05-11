import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";

import ErrorPill from "../Utils/Components/ErrorPill";
import { FormInput } from "../Utils/Styled/FormInput";

const LOGIN__REQUEST = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
      token
    }
  }
`;

const SIGNUP__REQUEST = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      _id
      username
      token
    }
    login(username: $username, password: $password) {
      _id
      username
      token
    }
  }
`;

const Login = (props) => {
  const [
    loginUser,
    { loading: loginUserLoading, error: loginUserError, data: loginUserData },
  ] = useMutation(LOGIN__REQUEST);

  const [
    signupUser,
    {
      loading: signupUserLoading,
      error: signupUserError,
      data: signupUserData,
    },
  ] = useMutation(SIGNUP__REQUEST);

  const [loginState, setLoginState] = useState(true);
  const [loginDataState, setLoginDataState] = useState({
    name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (loginState && loginUserData) {
      _saveUserData(
        loginUserData.login._id,
        loginUserData.login.username,
        loginUserData.login.token
      );
    } else if (!loginState && signupUserData) {
      _saveUserData(
        signupUserData.login._id,
        signupUserData.login.username,
        signupUserData.login.token
      );
    }
  });

  const onSubmitHandler = async () => {
    console.log("[Login.jsx] onSubmitHandler");
    const clonedState = cloneDeep(loginDataState);

    clonedState.name = loginState ? "" : document.getElementById("name").value;
    clonedState.username = document.getElementById("username").value;
    clonedState.password = md5(document.getElementById("password").value);
    setLoginDataState(clonedState);

    if (loginState) {
      await loginUser({
        variables: {
          username: clonedState.username,
          password: clonedState.password,
        },
      }).catch((e) => {
        console.log("Login error", e);
      });
    } else {
      await signupUser({
        variables: {
          username: clonedState.username,
          password: clonedState.password,
        },
      }).catch((e) => {
        console.log("Signup error", e);
      });
    }
  };

  const _saveUserData = (userId, username, userAuthtoken) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem("userAuthtoken", userAuthtoken);

    props.history.push(`/`);
  };

  return (
    <div className="w-full max-w-sm mx-auto my-20">
      {loginUserError ? (
        <div>
          {loginUserError.graphQLErrors.map(({ message }, i) => (
            <ErrorPill key={i} errorMsg={message} />
          ))}
        </div>
      ) : signupUserError ? (
        <div>
          {signupUserError.graphQLErrors.map(({ message }, i) => (
            <ErrorPill key={i} errorMsg={message} />
          ))}
        </div>
      ) : (
        ""
      )}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitHandler();
        }}
      >
        {!loginState && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <FormInput id="name" type="text" placeholder="Jaime Dordio" />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <FormInput id="username" type="text" placeholder="jaimedordio" />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <FormInput id="password" type="password" placeholder="······" />
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded transition duration-300 ease-in-out"
          >
            {loginState ? "Log in" : "Register"}
          </button>
          <div
            className="inline-block align-baseline font-regular text-sm hover:text-gray-500 cursor-pointer"
            onClick={() => setLoginState(!loginState)}
          >
            {loginState ? "Create an account" : "I already have an account"}
          </div>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Theore. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
