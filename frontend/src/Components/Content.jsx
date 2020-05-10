import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Content/Home";
import AddStore from "./Content/AddStore";
import Login from "./Content/Login";

const Content = (props) => {
  const { onStoreClick } = props;

  return (
    <div className="max-w-screen-lg mx-auto">
      <Switch>
        <Route exact path="/" component={() => <Home onStoreClick={onStoreClick}/>} />
        <Route exact path="/addStore" component={AddStore} />
        <Route exact path="/Login" component={Login} />
      </Switch>
    </div>
  );
};

export default Content;
