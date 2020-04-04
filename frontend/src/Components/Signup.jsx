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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signupUser({
          variables: { username: input_usr.value, password: input_pwd.value },
        });
        input_usr.value = "";
        input_pwd.value = "";
      }}
    >
      <input
        ref={(username) => {
          input_usr = username;
        }}
      />
      <input
        ref={(password) => {
          input_pwd = password;
        }}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default Signup;
