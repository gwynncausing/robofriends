<template>
  <div id="sidebar">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#sidebar {
  flex: 1;
  border-left: 1px solid $neutral-400;
  overflow-y: auto;
  height: 100vh;
  .title {
    border-bottom: 1px solid $neutral-400;
    padding: 16px;
  }
}
</style>
