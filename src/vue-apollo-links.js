/* Resources:
 *   [1] https://www.apollographql.com/docs/react/networking/advanced-http-networking/
 *   [2] Apollo Link Overview: https://www.apollographql.com/docs/react/api/link/introduction/
 *   [3] Why Apollo: https://www.apollographql.com/docs/react/why-apollo/
 */
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";

const ACCESS_TOKEN = localStorage.getItem("access-token") || "No Token";
const TOKEN_NAME = "JWT";

// HTTP connection to the API, replace with bud grapqhl server url
const httpLink = createHttpLink({
  uri: "https://api.spacex.land/graphql/",
});

// add the authorization to the request header
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `${TOKEN_NAME} ${ACCESS_TOKEN}`,
    },
  });
  return forward(operation);
});

export const customLinks = concat(authLink, httpLink);
