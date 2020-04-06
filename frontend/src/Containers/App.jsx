import React from "react";
import { Switch, Route } from "react-router-dom";

import Signup from "../Components/Signup";
import Stores from "../Components/Stores";
import Header from "../Components/Header";

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={Stores} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
