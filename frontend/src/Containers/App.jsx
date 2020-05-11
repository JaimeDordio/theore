import React, { useState } from "react";

import Header from "../Components/Header";
import Content from "../Components/Content";
import StoreDetail from "../Components/Content/StoreDetail";
import Footer from "../Components/Footer";

const App = (props) => {
  const [selectedStoreState, setSelectedStoreState] = useState(null);

  return (
    <div>
      <Header onSearchResultClick={setSelectedStoreState} />
      {selectedStoreState ? (
        <div className="fixed inset-0">
          <StoreDetail
            store={selectedStoreState}
            onStoreClick={setSelectedStoreState}
          />
        </div>
      ) : null}

      <div className="pt-12">
        <Content onStoreClick={setSelectedStoreState} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
