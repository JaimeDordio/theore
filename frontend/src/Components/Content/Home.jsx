import React from "react";

import StoresList from "./StoresList";

const Home = (props) => {
  const { onStoreClick } = props;

  return (
    <div>
      <div className="flex">
        <div className="w-4/6">
          <StoresList onStoreClick={onStoreClick} />
        </div>
        <div className="w-2/6 bg-white border border-gray-400 shadow-sm rounded-md overflow-hidden ml-5"></div>
      </div>
    </div>
  );
};

export default Home;
