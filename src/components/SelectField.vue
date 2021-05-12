<template>
  <v-select
    v-model="input"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :items="items"
    :rules="rules"
    outlined
    dense
    @change="$emit('change', input)"
  ></v-select>
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
    items: {
      type: Array,
      default: null,
    },
    rules: {
      type: Array,
      default: null,
    },
  },
  data: function () {
    return {
      input: "",
    };
  },
  watch: {
    rules: {
      handler() {
        console.log(this.rules);
      },
      immediate: true,
    },
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
  // margin-top: 10px !important;
  outline: none;
}
.v-input--is-focused {
  outline: none !important;
}
</style>
