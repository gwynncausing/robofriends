<template>
  <EmptyData>
    <template v-slot:title
      >Your team doesn't have any submitted proposals yet.</template
    >
    <template v-slot:content
      >To create a proposal, go to Create New tab.</template
    >
  </EmptyData>
</template>

<script>
import EmptyData from "@/components/student/EmptyData";

export default {
  name: "EmptyDataProposals",
  components: {
    EmptyData,
  },
};
</script>

<style lang="scss" scoped>
#empty-data-holder {
  min-height: 500px;
  margin-top: 50px;
}
</style>
