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
  border-left: 1px solid $neutral-400;
  overflow-y: auto;
  width: clamp(260px, 20vw, 320px);
  .title {
    border-bottom: 1px solid $neutral-400;
    padding: 16px;
  }
}
</style>
