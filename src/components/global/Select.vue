<template>
  <VSelect
    flat
    outlined
    dense
    :label="label"
    :color="color"
    :chips="chips"
    :clearable="clearable"
    :disabled="disabled"
    :readonly="readonly"
    :prepend-icon="prependIcon"
    :prepend-inner-icon="prependInnerIcon"
    :append-icon="appendIcon"
    :append-outer-icon="appendOuterIcon"
    :prefix="prefix"
    :suffix="suffix"
    :multiple="multiple"
    :clear-icon="clearIcon ? 'mdi-close-circle' : 'mdi-close'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="slotName in Object.keys($slots)" :slot="slotName">
      <slot :name="slotName" />
    </template>
  </VSelect>
</template>

<script>
import { VSelect } from "vuetify/lib";

export default {
  name: "Select",
  components: { VSelect },
  inheritAttrs: true,
  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    prependIcon: {
      type: String,
      default: "",
    },
    prependInnerIcon: {
      type: String,
      default: "",
    },
    appendIcon: {
      type: String,
      default: "mdi-menu-down",
    },
    appendOuterIcon: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    clearIcon: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang="scss" scoped>
i.v-icon.icon-right {
  margin-left: 8px;
}
</style>
