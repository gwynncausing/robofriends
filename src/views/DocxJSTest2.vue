<template>
  <div>Exports from autoformatter</div>
</template>

<script>
import autoformat from "@/utils/autoformatter/autoformat";
import sampleV9 from "@/utils/sample-v9.json"; // tables
import { ACM_FORMAT } from "@/utils/autoformatter/format-rules";

export default {
  data() {
    return {
      //
    };
  },

  mounted() {
    autoformat.generateDocument(ACM_FORMAT, [sampleV9]);
  },
};
</script>

<style></style>
