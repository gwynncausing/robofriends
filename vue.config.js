let path = require("path");

module.exports = {
  devServer: {
    disableHostCheck: true, // remove or false on production
  },
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/_variables.scss";
                        @import "@/styles/_custom.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Bud";
      return args;
    });
  },
};
