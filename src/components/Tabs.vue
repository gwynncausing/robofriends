<template>
  <div>
    <v-tabs
      v-model="tab"
      v-bind="$attrs"
      grow
      center-active
      show-arrows
      v-on="$listeners"
    >
      <v-tab
        v-for="(item, index) in items"
        :key="index"
        :href="`#${item.value}`"
        class="font-medium"
        >{{ item.title }}</v-tab
      >
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item, index) in items"
        :key="index"
        :value="item.value"
      >
        <slot :name="`body-${item.value}`" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "AppTabsHolder",
  props: {
    active: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    tab: {
      set(tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } });
      },
      get() {
        return this.$route.query.tab;
      },
    },
  },
  watch: {
    active() {
      this.tab = this.active;
    },
  },
};
</script>

<<<<<<< Updated upstream
<style lang="scss" style="scoped"></style>
||||||| constructed merge base
<style style="scoped"></style>
=======
<style style="scoped">
.v-tabs {
}
</style>
>>>>>>> Stashed changes
