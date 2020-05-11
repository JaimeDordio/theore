import React from "react";

const Footer = (props) => {
  return (
    <>
      <div className="bg-white pt-2 w-full border-t">
        <div
          className="pb-5 px-3 m-auto pt-5
          max-w-screen-lg flex justify-between"
        >
          <span className="text-gray-900 text-sm">
            © Copyright 2020 Theore. All Rights Reserved.
          </span>
          <a className="text-gray-500 text-sm" href="https://clearbit.com">
            Logos provided by Clearbit
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
