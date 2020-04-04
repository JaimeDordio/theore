import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import './index.css';
import App from './Containers/App.jsx';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: "http://localhost:8001/"
});

ReactDOM.render(
  <React.StrictMode>
    <App client={client} />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();