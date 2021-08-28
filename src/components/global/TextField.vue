<template>
  <VTextField
    flat
    outlined
    dense
    :label="label"
    :color="color"
    :clearable="clearable"
    :disabled="disabled"
    :readonly="readonly"
    :prepend-icon="prependIcon"
    :prepend-inner-icon="prependInnerIcon"
    :append-icon="appendIcon"
    :append-outer-icon="appendOuterIcon"
    :prefix="prefix"
    :suffix="suffix"
    :name="name"
    :clear-icon="clearIcon ? 'mdi-close-circle' : 'mdi-close'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="slotName in Object.keys($slots)" :slot="slotName">
      <slot :name="slotName" />
    </template>
  </VTextField>
</template>

<script>
import { VTextField } from "vuetify/lib";

export default {
  name: "TextField",
  components: { VTextField },
  inheritAttrs: true,
  props: {
    name: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
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
      default: "",
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
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field {
  background-color: white;
}
i.v-icon.icon-right {
  margin-left: 8px;
}
</style>
