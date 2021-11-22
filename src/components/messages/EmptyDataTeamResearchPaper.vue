<template>
  <EmptyData>
    <template v-slot:title>Research Paper Editor is not Available</template>
    <template v-slot:content
      >You can access this tab when you approve of one of the submitted
      proposals of the team.</template
    >
  </EmptyData>
</template>

<script>
import EmptyData from "./EmptyData";

export default {
  name: "EmptyDataTeamResearchPaper",
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
