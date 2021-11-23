<template>
  <div id="archive">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "StudentArchive",
};
</script>

<style lang="scss" scoped></style>
