<template>
  <div>Exports from autoformatter</div>
</template>

<script>
import autoformat from "@/utils/autoformatter/autoformat";
import sampleV3 from "@/utils/sample-v3.json";

export default {
  data() {
    return {
      //
    };
  },

  mounted() {
    const rules = {
      title: "title sample",
      creator: "content sample",
      description: " description sample",
    };
    // console.log(rules);
    // console.log(sampleV3);
    // console.log(autoformat);
    autoformat.generateDocument(rules, [sampleV3, sampleV3]);
  },
};
</script>

<style></style>
