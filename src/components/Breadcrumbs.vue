<template>
  <v-row>
    <v-breadcrumbs :items="items" large> </v-breadcrumbs>
  </v-row>
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
.row {
  background-color: gray;
  height: 50px;
}
</style>
