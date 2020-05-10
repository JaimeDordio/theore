import React from "react";

import StoresList from "./StoresList";

const Home = (props) => {
  const { onStoreClick } = props;

  return (
    <div>
      <div className="flex">
        <div className="flex-none sm:flex-1 md:flex-auto lg:flex-initial xl:flex-1">
          <StoresList onStoreClick={onStoreClick} />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Home;
