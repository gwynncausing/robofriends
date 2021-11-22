<template>
  <EmptyData>
    <template v-slot:title>Excited to work on your research?</template>
    <template v-slot:content
      >We’re still waiting for your proposal to get approved. Sit tight for now
      and come back later :)</template
    >
  </EmptyData>
</template>

<script>
import EmptyData from "./EmptyData";

export default {
  name: "EmptyDataApprovedResearch",
  components: {
    EmptyData,
  },
};
</script>

<style lang="scss" scoped></style>
