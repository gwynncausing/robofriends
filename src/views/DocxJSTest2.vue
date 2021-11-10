<template>
  <div>Exports from autoformatter</div>
</template>

<script>
import autoformat from "@/utils/autoformatter/autoformat";
import sampleV6 from "@/utils/sample-v6.json"; // tables
import sampleV7 from "@/utils/sample-v7.json"; // tables
import sampleV9 from "@/utils/sample-v9.json"; // tables
import { ACM_FORMAT } from "@/utils/autoformatter/format-rules";

export default {
  data() {
    return {
      //
    };
  },

  mounted() {
    autoformat.generateDocument(ACM_FORMAT, [sampleV6, sampleV7, sampleV9]);
  },
};
</script>

<style></style>
