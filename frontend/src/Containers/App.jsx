import React from "react";

import Header  from "../Components/Header";
import Content from "../Components/Content/Content";

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <Content/>
      </div>
    </div>
  );
};

export default App;