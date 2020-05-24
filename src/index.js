import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

import App from "./app";
import ScrollToTop from "./components/ScrollToTop";

import "./app.css";

const BASEURL = "https://techquiz-production.herokuapp.com/api";

const httpLink = createHttpLink({
  uri: BASEURL
});

const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem(AUTH_TOKEN);
  // window.localStorage.clear();
  return {
    headers: {
      ...headers
      // authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ScrollToTop />
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
