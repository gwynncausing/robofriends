<template>
  <v-img
    :src="require('@/assets/logo.svg')"
    class="logo"
    contain
    alt="Bud Logo"
    :height="height"
  >
    <template v-slot:placeholder>
      <v-sheet color="grey lighten-4" class="pa-3 logo mx-auto" :width="width">
        <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
      </v-sheet>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "ImageLogo",
  props: {
    height: {
      type: String,
      default: "150px",
    },
    width: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.logo {
  margin-bottom: 50px;
}
</style>
