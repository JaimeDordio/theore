import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "../Components/Login";
import Stores from "../Components/Stores";
import Header from "../Components/Header";

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <Switch>
          <Route exact path="/" component={Stores} />
          <Route exact path="/Login" component={Login} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
