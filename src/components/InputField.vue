<template>
  <v-text-field
    v-model="input"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :required="required"
    :hide-details="hidedetails"
    :rules="rules"
    outlined
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
    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
    hidedetails: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
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
    text: {
      handler() {
        this.input = this.text;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field {
  // margin-top: 10px !important;
  outline: none;
}
.v-input--is-focused {
  outline: none !important;
}
</style>
