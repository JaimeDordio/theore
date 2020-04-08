import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";

const LOGIN__REQUEST = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
      password
      token
    }
  }
`;

const SIGNUP__REQUEST = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      _id
      username
      password
      token
    }
  }
`;

const Login = (props) => {
  const [loginUser, { data: loginUserData }] = useMutation(LOGIN__REQUEST);
  const [signupUser, { data: signupUserData }] = useMutation(SIGNUP__REQUEST);

  console.log("[Component] loginUserData", loginUserData);
  console.log("[Component] signupUserData", signupUserData);

  const [loginState, setLoginState] = useState(true);
  const [loginDataState, setLoginDataState] = useState({
    name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (loginState && loginUserData) {
      _saveUserData(loginUserData.login.token);
    } else if (!loginState && signupUserData) {
      _saveUserData(signupUserData.signup.token);
    }
  });

  const onSubmitHandler = async () => {
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
      });
    } else {
      await signupUser({
        variables: {
          username: clonedState.username,
          password: clonedState.password,
        },
      });
    }
  };

  const _saveUserData = (token) => {
    console.log("[_saveUserData] token", token);
    localStorage.setItem("authToken", token);
    // setAuthCookie("authToken", token, {
    //   path: "/",
    //   maxAge: "86400",
    //   httpOnly: true,
    // });
    console.log(localStorage.getItem("authToken"));

    props.history.push(`/`);
  };

  return (
    <div className="w-full max-w-xs mx-auto my-20">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {!loginState && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Jaime Dordio"
            />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="jaimedordio"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="······"
          />
        </div>
        <div className="flex items-center justify-between">
          <div
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            onClick={() => onSubmitHandler()}
          >
            {loginState ? "Log in" : "Register"}
          </div>
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
