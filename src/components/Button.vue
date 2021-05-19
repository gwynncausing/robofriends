<template>
  <v-btn
    :bordered="bordered"
    :color="color"
    :type="type"
    :small="small"
    :large="large"
    :depressed="depressed"
    :dark="dark"
    :block="block"
    :text="text"
    :loading="loading"
    @click="$emit('click', true)"
  >
    <slot> </slot>
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    bordered: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    depressed: {
      type: Boolean,
      default: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
