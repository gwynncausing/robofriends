<template>
  <v-text-field
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :required="required"
    outlined
    hide-details
    dense
    v-model="input"
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
  data: function () {
    return {
      input: "",
    };
  },
  watch: {
    input: {
      handler() {
        this.$emit("output", this.input);
        console.log(
          `%cInput ${this.label}: %c${this.input}`,
          "font-size: 14px; color: green",
          ""
        );
      },
      immediate: false,
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
