import React from "react";

import Header  from "../Components/Header";
import Content from "../Components/Content";

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="p-4">
        <Content/>
      </div>
    </div>
  );
};

export default App;