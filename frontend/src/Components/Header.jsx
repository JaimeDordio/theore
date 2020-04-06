import React from "react";
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import theore_logo from "../images/theore_logo.svg";

const Header = (props) => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={theore_logo} alt="Theore" className="fill-current h-8 w-8 mr-2" />
        <span className="font-semibold text-black text-xl tracking-tight">
          Theore
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4"
          >
            Home
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4"
          >
            Login
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white"
          >
            Register
          </a>
        </div>
      </div>
      
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <Link to="/" className="ml1 no-underline black">
            Home
          </Link>
          <div className="ml1">|</div>
          <Link to="/signup" className="ml1 no-underline black">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
