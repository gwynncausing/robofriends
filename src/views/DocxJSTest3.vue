<template>
  <div>Exports from autoformatter</div>
</template>

<script>
import autoformat from "@/utils/autoformatter/autoformat";
import sampleV2 from "@/utils/sample-v2.json"; // Heading
import sampleV3 from "@/utils/sample-v3.json"; // paragraphs
import sampleV6 from "@/utils/sample-v6.json"; // lists

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
    autoformat.generateDocument(rules, [sampleV2, sampleV3, sampleV6]);
  },
};
</script>

<style></style>
