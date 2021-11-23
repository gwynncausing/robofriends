<template>
  <div id="research-paper">
    <div class="buttons-wrapper">
      <Button
        v-show="!isMarkedAsComplete"
        @click="$emit('showMarkAsCompleteDialog', true)"
      >
        Mark as Complete
      </Button>
      <Button v-show="isMarkedAsComplete" outlined>Mark as Incomplete</Button>
      <Button
        v-show="isMarkedAsComplete && !isPublished"
        @click="$emit('showPublishDialog', true)"
      >
        Publish to Research Archive
      </Button>
      <Button v-show="isMarkedAsComplete && isPublished" outlined>
        Unpublish
      </Button>
    </div>
    <EditorNestedReadonly :list="blocks" />
  </div>
</template>

<script>
import Button from "@/components/global/Button";
import EditorNestedReadonly from "@/components/editor/EditorNestedReadonly";
export default {
  name: "ResearchPaper",
  components: {
    Button,
    EditorNestedReadonly,
  },
  props: {
    blocks: {
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
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  .buttons-wrapper {
    display: flex;
    column-gap: 8px;
    justify-content: flex-end;
  }
}
</style>
