<template>
  <div class="test">
    <!-- {{ posts }} -->
    <v-tabs v-model="tab" background-color="grey lighten-4">
      <v-tab href="#test"> Test 0 </v-tab>
      <v-tab href="#test-1" to="/test?tab=test-1"> Test 1 </v-tab>
      <v-tab href="#test-2" to="/test?tab=test-2"> Test 2 </v-tab>
    </v-tabs>
    <v-tabs-items :value="tab">
      <v-tab-item value="test"> TEST 0 </v-tab-item>
      <v-tab-item value="test-1"> TEST 1 </v-tab-item>
      <v-tab-item value="test-2"> TEST 2 </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
// import AppTabs from "@/components/AppTabs.vue";
import { mapActions, mapGetters } from "vuex";
import { FETCH_TEST } from "@/store/types/actions";

export default {
  name: "Test",
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters({
      posts: "getTest",
    }),
    tab: {
      set(tab) {
        console.log("I am here");
        this.$router.replace({ query: { ...this.$route.query, tab } });
      },
      get() {
        return this.$route.query.tab;
      },
    },
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
