<template>
  <v-text-field
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :required="required"
    outlined
    hide-details
    dense
  ></v-text-field>
</template>

<script>
export default {
  name: "InputField",
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field {
  margin-top: 20px !important;
  outline: none;
}
.v-input--is-focused {
  outline: none !important;
}
</style>
