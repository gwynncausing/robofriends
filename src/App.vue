<template>
  <v-app :style="cssProps">
    <v-main>
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
}
.v-application {
  color: $neutral-900 !important;
}
.v-btn {
  text-transform: none !important;
}
.v-tab {
  text-transform: none !important;
  border-bottom: 2px solid var(--v-neutral-300);
  max-width: 500px !important;
}
span.v-chip--select.v-chip.v-chip--clickable.v-chip--no-color.theme--light.v-size--default {
  margin-top: 2px;
  margin-bottom: 2px;
}
a {
  text-decoration: none;
}
</style>
