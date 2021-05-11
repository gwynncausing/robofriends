/* Resources:
 *   [1] Manual Installation: https://vue-apollo.netlify.app/guide/installation.html#_1-apollo-client
 *   [2] Apollo Link Overview: https://www.apollographql.com/docs/react/api/link/introduction/
 *   [3] Why Apollo: https://www.apollographql.com/docs/react/why-apollo/
 *
 *   Note:
 *       this.$apollo.mutate({mutation: '', variables: {}})
 */
import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { customLinks } from "./vue-apollo-links";

Vue.use(VueApollo);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: customLinks,
  cache,
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
