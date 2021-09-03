<template>
  <VBtn
    :x-large="xLarge"
    :large="large"
    :small="small"
    :outlined="outlined"
    :rounded="rounded"
    :icon="icon"
    :plain="plain"
    :dark="dark"
    :text="text"
    :color="color"
    :block="block"
    :fab="fab"
    :disabled="disabled"
    :ripple="ripple"
    :depressed="true"
    :class="{
      default: !small && !large && !xLarge,
      'font-medium': text,
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="slotName in Object.keys($slots)" :slot="slotName">
      <slot :name="slotName" />
    </template>

    <template v-if="!$slots.loader" #loader> Loading... </template>
  </VBtn>
</template>

<script>
import { VBtn } from "vuetify/lib";

export default {
  name: "Button",
  components: { VBtn },
  inheritAttrs: false,
  props: {
    xLarge: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    ripple: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang="scss" scoped>
button,
a {
  font-family: "Montserat", Tahoma, Geneva, Verdana, sans-serif !important;
  font-weight: $font-weight-bold;
  letter-spacing: 0.04rem;
}
.default {
  height: 40px !important;
}
i.v-icon.icon-right {
  margin-left: 8px;
}
</style>
