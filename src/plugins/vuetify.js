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
        "primary-100": "#D0F3E4",
        "primary-200": "#A8E8CD",
        "primary-300": "#80DDB6",
        "primary-400": "#58D29F",
        "primary-500": "#2FAF79",
        "primary-600": "#299B6B",
        secondary: "#F16F82",
        "secondary-100": "#FCE3E7",
        "secondary-200": "#FACCD3",
        "secondary-300": "#F8B5BE",
        "secondary-400": "#F38696",
        "secondary-500": "#EF586E",
        "secondary-600": "#EA2945",
        tertiary: "#1F724F",
        "tertiary-100": "#A9E7CD",
        "tertiary-200": "#80DDB6",
        "tertiary-300": "#35C287",
        "tertiary-400": "#2A9A6B",
        "tertiary-500": "#1A5E41",
        "tertiary-600": "#144A33",
        yellow: "#FFB93E",
        "yellow-100": "#FFF0D7",
        "yellow-200": "#FFDEA4",
        "yellow-300": "#FFCB71",
        "yellow-400": "#FFC257",
        "yellow-500": "#FFB024",
        "yellow-600": "#F09900",
        red: "#E8524D",
        "red-100": "#FCECEB",
        "red-200": "#FAD6D4",
        "red-300": "#F4AAA7",
        "red-400": "#EE7E7A",
        "red-500": "#E53C36",
        "red-600": "#CE201B",
        blue: "#617FDE",
        "blue-100": "#F5F7FD",
        "blue-200": "#E0E6F8",
        "blue-300": "#B5C3F0",
        "blue-400": "#8BA1E7",
        "blue-500": "#4C6EDA",
        "blue-600": "#2A50C9",
        "neutral-50": "#F0F0F0",
        "neutral-100": "#E6E6E6",
        "neutral-200": "#CCCCCC",
        "neutral-300": "#B3B3B3",
        "neutral-400": "#999999",
        "neutral-500": "#808080",
        "neutral-600": "#5E5E5E",
        "neutral-700": "#4D4D4D",
        "neutral-800": "#333333",
        "neutral-900": "#212121",
        black: "#000000",
        white: "#FFFFFF",
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});

export default vuetify;
