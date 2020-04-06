import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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

const Signup = (props) => {
  let input_usr;
  let input_pwd;
  const [signupUser] = useMutation(SIGNUP__REQUEST);

  return (
    <div className="container w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => {
            e.preventDefault();
            signupUser({
            variables: { username: input_usr.value, password: input_pwd.value },
            });
            input_usr.value = "";
            input_pwd.value = "";
        }}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={(username) => input_usr = username} type="text" placeholder="Username"/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" ref={(password) => {
          input_pwd = password;
        }} type="password" placeholder="******************"/>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign Up
        </button>
      </div>
    </form>
    <p className="text-center text-gray-500 text-xs">
      &copy;2020 Theore. All rights reserved.
    </p>
  </div>
  );
};

export default Signup;
