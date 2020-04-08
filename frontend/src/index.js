import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./assets/tailwind_output.css";
import App from "./Containers/App.jsx";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: `http://localhost:8001/`,
});

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
