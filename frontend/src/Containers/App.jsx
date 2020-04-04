import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import Signup from "../Components/Signup";
import Stores from "../Components/Stores";
import Header from "../Components/Header";

const App = props => {
  const { client } = props;

  return (
    <ApolloProvider client={client}>
      <div>
        <Header/>
        <h2>My first Apollo app </h2>
        <Signup/>
        <Stores/>
      </div>
    </ApolloProvider>
  );
};

export default App;
