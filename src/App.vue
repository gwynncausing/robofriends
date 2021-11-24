<template>
  <v-app :style="cssProps">
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
  computed: {
    cssProps() {
      var themeColors = {};
      Object.keys(this.$vuetify.theme.themes.light).forEach((color) => {
        themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color];
      });
      return themeColors;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/_global-styles.scss";
@import "@/styles/_transitions.scss";
@import "@/styles/prosemirror.scss";
// .container {
// max-width: 1251px !important;
// }
.container {
  margin: 0px !important;
  padding: 0px !important;
  max-width: 100% !important;
}
</style>
