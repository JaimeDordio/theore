import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import "./assets/tailwind_output.css";
import App from "./Containers/App.jsx";
import * as serviceWorker from "./serviceWorker";

const api_uri =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8001`
    : `https://theore.now.sh/`;

const client = new ApolloClient({
  uri: api_uri,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
