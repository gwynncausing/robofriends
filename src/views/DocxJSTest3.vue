<template>
  <div>Exports from autoformatter</div>
</template>

<script>
import autoformat from "@/utils/autoformatter/autoformat";
// import sampleV2 from "@/utils/sample-v2.json"; // Heading
// import sampleV3 from "@/utils/sample-v3.json"; // paragraphs
import sampleV4 from "@/utils/sample-v4.json"; // image
// import sampleV6 from "@/utils/sample-v6.json"; // lists
import { ACM_FORMAT } from "@/utils/autoformatter/format-rules";

export default {
  data() {
    return {
      //
    };
  },

  mounted() {
    // console.log(rules);
    // console.log(sampleV3);
    // console.log(autoformat);
    // autoformat.generateDocument(rules, [
    //   sampleV2,
    //   sampleV3,
    //   sampleV4,
    //   sampleV6,
    // ]);
    autoformat.generateDocument(ACM_FORMAT, [sampleV4]);
  },
};
</script>

<style></style>
