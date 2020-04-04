import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import Signup from "../Components/Signup";
import Stores from "../Components/Stores";

const App = props => {
  const { client } = props;

  return (
    <ApolloProvider client={client}>
      <div className="container p-4">
        <h2>My first Apollo app 🚀</h2>
        <Signup/>
        <Stores/>
      </div>
    </ApolloProvider>
  );
};

export default App;
