import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
  const [loginUser] = useMutation(LOGIN__REQUEST);
  const [signupUser] = useMutation(SIGNUP__REQUEST);

  const [loginState, setLoginState] = useState({
    login: true,
    username: "",
    password: "",
    name: "",
  });

  const _confirm = async () => {
    console.log('[Login.jsx] _confirm()');
    // ... you'll implement this 🔜
  };

  const _saveUserData = (token) => {};

  return (
    <div className="w-full max-w-xs mx-auto my-20">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {!loginState.login && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Name
            </label>
            <input
              value={loginState.name}
              onChange={(e) => setLoginState({ name: e.target.value })}
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
            value={loginState.username}
            onChange={(e) => setLoginState({ email: e.target.value })}
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
            value={loginState.password}
            onChange={(e) => setLoginState({ password: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="······"
          />
        </div>
        <div className="flex items-center justify-between">
          <div
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            onClick={() => _confirm()}
          >
            {loginState.login ? "Log in" : "Register"}
          </div>
          <div
            className="inline-block align-baseline font-regular text-sm hover:text-gray-500 cursor-pointer"
            onClick={() => setLoginState({ login: !loginState.login })}
          >
            {loginState.login
              ? "Create an account"
              : "I already have an account"}
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
