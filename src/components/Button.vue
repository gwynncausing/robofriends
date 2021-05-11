<template>
  <v-btn> </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    bordered: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
