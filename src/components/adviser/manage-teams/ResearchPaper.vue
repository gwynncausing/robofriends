<template>
  <div id="research-paper">
    <EditorNestedReadonly
      :list="blocks"
      :comment-list="commentList"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import EditorNestedReadonly from "@/components/editor/EditorNestedReadonly";
export default {
  name: "ResearchPaper",
  components: {
    EditorNestedReadonly,
  },
  props: {
    blocks: {
      required: true,
      type: Array,
      default: () => [],
    },
    commentList: {
      required: true,
      type: Array,
      default: () => [],
    },
    isMarkedAsComplete: {
      required: true,
      type: Boolean,
      default: false,
    },
    isPublished: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
#research-paper {
  padding-top: 24px;
}
</style>
