<template>
  <div id="sidebar">
    <div class="title">
      <slot name="title"></slot>
      <v-btn v-if="collapsible" icon @click="closeSidebar">
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    collapsible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeSidebar() {
      this.$emit("closed", false);
    },
  },
};
</script>

<style lang="scss" scoped>
#sidebar {
  border-left: 1px solid $neutral-400;
  overflow-y: auto;
  width: clamp(260px, 20vw, 320px);
  .title {
    border-bottom: 1px solid $neutral-400;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
