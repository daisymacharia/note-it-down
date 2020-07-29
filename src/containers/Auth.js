import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "@apollo/link-context";
import { onError } from "apollo-link-error";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const AuthorizedApolloProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message }) => console.log(message, "error"));
  });

  const httpLink = createHttpLink({
    uri: "http://localhost:4300/graphql",
    fetchOptions: { credentials: "include" },
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink, errorLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
