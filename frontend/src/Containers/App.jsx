import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import TestRequest from "../Components/apollo-hooks/TestRequest";

const App = props => {
  const { client } = props;

  return (
    <ApolloProvider client={client}>
      <div>
        <TestRequest/>
        <h2>My first Apollo app 🚀</h2>
      </div>
    </ApolloProvider>
  );
};

export default App;
