<template>
  <div class="test">
    {{ posts }}
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Test",
  components: {},
  data: function () {
    return {
      posts: {},
    };
  },
  async created() {
    this.posts = await this.test();
  },
  methods: {
    ...mapActions(["test"]),
  },
};
</script>

<style lang="scss" scoped></style>
