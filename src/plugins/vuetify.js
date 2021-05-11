import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      options: {
        customProperties: true,
      },
      light: {
        primary: "#34C387",
        secondary: "#34C387",
        accent: "#F16F82",
        lightgrey: "#E4E4E4",
        lightgrey2: "#FBFBFB",
        midgrey: "#5E5E5E",
        darkgrey: "#090909",
        yellow: "#FFB93E",
        red: "#E8524D",
        blue: "#617FDE",
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});

export default vuetify;
