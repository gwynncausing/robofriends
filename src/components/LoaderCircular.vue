<template>
  <v-progress-circular
    :indeterminate="indeterminate"
    :color="color"
    :size="size"
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-progress-circular>
</template>

<script>
export default {
  name: "LoaderCircular",
  props: {
    indeterminate: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: Number,
      default: 32,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
