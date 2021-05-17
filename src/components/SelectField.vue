<template>
  <v-select
    v-model="input"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :items="items"
    :rules="rules"
    :hide-details="hidedetails"
    :multiple="multiple"
    :chips="chips"
    :item-text="itemText"
    :item-value="itemValue"
    outlined
    dense
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
    hidedetails: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
    items: {
      type: Array,
      default: null,
    },
    itemSelected: {
      type: String,
      default: "",
    },
    itemText: {
      type: String,
      default: "",
    },
    itemValue: {
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
    itemSelected: {
      handler() {
        this.input = this.itemSelected;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field {
  outline: none;
}
.v-input--is-focused {
  outline: none !important;
}
</style>
