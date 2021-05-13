<template>
  <div id="breadcrumbs">
    <v-breadcrumbs :items="items" large> </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#breadcrumbs {
  background-color: var(--v-lightgrey2);
  // background-color: black;
  height: 50px;
  border-radius: 4px;
}
.v-application a {
  color: red !important;
}
</style>
