<template>
  <div>Exports from autoformatter</div>
</template>

<script>
import autoformat from "@/utils/autoformatter/autoformat";
import sampleV4 from "@/utils/sample-v4.json"; // image
// import sampleV6 from "@/utils/sample-v6.json"; // list
import sampleV7 from "@/utils/sample-v7.json"; // list
import sampleV9 from "@/utils/sample-v9.json"; // tables
import { ACM_FORMAT } from "@/utils/autoformatter/format-rules";

export default {
  data() {
    return {
      //
    };
  },

  mounted() {
    autoformat.generateDocument(ACM_FORMAT, [sampleV4, sampleV7, sampleV9]);
  },
};
</script>

<style></style>
