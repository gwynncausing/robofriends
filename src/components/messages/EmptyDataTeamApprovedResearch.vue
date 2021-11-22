<template>
  <EmptyData>
    <template v-slot:title>No Approved Research</template>
    <template v-slot:content
      >You have not approved any of the proposals submitted by this
      team.</template
    >
  </EmptyData>
</template>

<script>
import EmptyData from "./EmptyData";

export default {
  name: "EmptyDataTeamApprovedResearch",
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
