import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import theore_logo from "../images/theore_logo.svg";

const Header = (props) => {
  return (
    <nav className="p-4 bg-gray-100">
      <div className="max-w-screen-lg flex items-center justify-between mx-auto">
        <div className="flex items-center align-start">
          <Link to="/" className="flex items-center">
            <img src={theore_logo} alt="Theore" className="h-8 w-8 mr-2" />
            <span className="font-medium text-black text-base mr-5">
              Theore
            </span>
          </Link>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
            type="text"
            placeholder="Search a store"
          />
          <Link
            to="/"
            className="block lg:inline-block text-black hover:text-gray-500 mx-4"
          >
            Home
          </Link>
        </div>

        <div className="flex items-center">
          {localStorage.getItem("userId") &&
          localStorage.getItem("username") &&
          localStorage.getItem("userAuthtoken") ? (
            <>
              <div className="block mt-4 lg:inline-block lg:mt-0 text-sm mr-4">
                Hello, {localStorage.getItem("username")}
              </div>

              <div
                className="block mt-4 lg:inline-block lg:mt-0 text-sm hover:text-gray-600 mr-4 cursor-pointer"
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
              className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
