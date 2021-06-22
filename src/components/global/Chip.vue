<template>
  <VChip
    flat
    hide-details
    dense
    :label="label"
    :close="close"
    :disabled="disabled"
    :draggable="draggable"
    :outlined="outlined"
    :filter-icon="filterIcon"
    :close-icon="closeIcon ? 'mdi-close-circle' : 'mdi-close'"
    :color="color"
    :small="small"
    :large="large"
    :x-large="xLarge"
    :pill="pill"
    :prepend-icon="prependIcon"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="slotName in Object.keys($slots)" :slot="slotName">
      <slot :name="slotName" />
    </template>
  </VChip>
</template>

<script>
import { VChip } from "vuetify/lib";

export default {
  name: "Chip",
  components: { VChip },
  inheritAttrs: false,
  props: {
    label: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    filterIcon: {
      type: String,
      default: "",
    },
    closeIcon: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary",
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    xLarge: {
      type: Boolean,
      default: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
i.v-icon.icon-right {
  margin-left: 8px;
}
</style>
