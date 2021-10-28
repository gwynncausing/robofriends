<template>
  <div class="approved-research">
    <div class="editor-wrapper">
      <EditorTextWithTitleReadonly
        :editor-data="{ id: 123, content: research.content }"
        @input="getContent($event)"
      />
    </div>
  </div>
</template>

<script>
import EditorTextWithTitleReadonly from "@/components/editor/EditorTextWithTitleReadonly";

export default {
  name: "ApprovedResearch",
  components: {
    EditorTextWithTitleReadonly,
  },
  data() {
    return {
      research: {
        id: "1",
        title: "title",
        content: `aaaaa`,
        feedback: {
          id: "1",
          date: "1/1/2021",
          time: "11:00",
          text: "Good job!",
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.approved-research {
  padding-top: 24px;
  .editor-wrapper {
    width: 100%;
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
}
</style>
