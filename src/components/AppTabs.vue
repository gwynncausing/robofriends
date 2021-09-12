<template>
  <div id="apptabs">
    <v-tabs v-model="activeTab" fixed-tabs>
      <v-tab v-for="(item, index) in items" :key="index">{{
        item.title
      }}</v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "AppTabs",
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      items: [
        {
          title: "Item One",
          route: "Test",
        },
        {
          title: "Item Two",
          route: "Test-1",
        },
        {
          title: "Item Three",
          route: "Test-2",
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
#apptabs {
  background: red !important;
  height: 20px;
}
.v-tab {
  text-transform: none !important;
}
</style>
