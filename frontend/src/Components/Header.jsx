import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import theore_logo from "../images/theore_logo.svg";

const Header = (props) => {
  return (
    <nav className="p-4 bg-gray-100">
      <div className="max-w-screen-lg flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <img src={theore_logo} alt="Theore" className="h-8 w-8 mr-2" />
          <span className="font-medium text-black text-base mr-5">Theore</span>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="text"
            placeholder="Search a store"
          />
        </div>

        <div className="flex items-center">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 ml-4 rounded"
          >
            Home
          </Link>
          <div
            className="block mt-4 lg:inline-block lg:mt-0 text-sm hover:text-gray-600 mr-4"
            onClick={() => {
              // removeAuthCookie("authToken");
              localStorage.removeItem("userId");
              localStorage.removeItem("userAuthtoken");
              props.history.push(`/`);
            }}
          >
            Logout
          </div>
          <Link
            to="/login"
            className="bg-transparent hover:bg-blue-500 text-sm text-blue-700 font-medium hover:text-white py-2 px-4 ml-4 border border-blue-500 hover:border-transparent rounded"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
