<template>
  <div class="research-paper">
    <EditorNestedReadonly :list="blocks" />
  </div>
</template>

<script>
import EditorNestedReadonly from "@/components/editor/EditorNestedReadonly";
export default {
  name: "ResearchPaper",
  components: { EditorNestedReadonly },
  props: {
    blocks: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.research-paper {
  padding-top: 24px;
}
</style>
