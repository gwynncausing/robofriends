<template>
  <v-app :style="cssProps">
    <v-main class="main">
      <router-view />
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700;800&display=swap");

* {
  font-family: "Montserrat", Tahoma, Geneva, Verdana, sans-serif;
  // font-size: 16px;
}
.v-btn {
  text-transform: none !important;
}
span.v-chip--select.v-chip.v-chip--clickable.v-chip--no-color.theme--light.v-size--default {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
