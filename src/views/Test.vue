<template>
  <div class="test">
    {{ posts }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { FETCH_TEST } from "@/store/types/actions";

export default {
  name: "Test",
  components: {},
  data: function () {
    return {};
  },
  computed: {
    ...mapGetters({
      posts: "getTest",
    }),
  },
  async created() {
    try {
      await this.fetchPosts();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  methods: {
    ...mapActions({
      fetchPosts: FETCH_TEST,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
