import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import Home from "./Home/Home";

const Content = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
      </Switch>
    </div>
  );
};

export default Content;
