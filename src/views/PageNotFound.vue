<template>
  <div id="page-not-found">
    <h1>Page not found</h1>
    <v-btn class="primary" @click="clicked">go back</v-btn>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  methods: {
    clicked() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
#page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
