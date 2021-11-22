<template>
  <EmptyData>
    <template v-slot:title>No Pending Proposals</template>
    <template v-slot:content>{{ content }}</template>
  </EmptyData>
</template>

<script>
import EmptyData from "./EmptyData";

export default {
  name: "EmptyDataTeamProposals",
  components: {
    EmptyData,
  },
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
#empty-data-holder {
  min-height: 500px;
  margin-top: 50px;
}
</style>
