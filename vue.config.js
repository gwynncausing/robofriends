/* Resources:
 *   [1] Loader for gql: https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
 *
 */

module.exports = {
  chainWebpack: (config) => {
    // [1]
    // GraphQL Loader
    config.module
      .rule("graphql")
      .test(/\.gql$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  },
  transpileDependencies: ["vuetify"],
};
