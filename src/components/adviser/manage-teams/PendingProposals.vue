<template>
  <div class="pending-proposals">
    <div
      v-for="(proposal, index) in pendingProposals"
      :key="proposal.id"
      class="proposal-list-wrapper"
    >
      <div class="proposal-wrapper">
        <div class="editor-wrapper">
          <EditorTextWithTitleReadonly
            :editor-data="{ id: 123, content: proposal.content }"
            @input="getContent($event)"
          />
        </div>
        <div class="feedback-wrapper">
          <div class="feedback-label font-semi-bold">Feedback</div>
          <Textarea v-model="proposal.feedback.text" />
        </div>
        <div class="button-wrapper">
          <Button> Approve </Button>
          <Button color="red" dark> Reject </Button>
          <Button color="yellow" dark> Ask to Revise </Button>
        </div>
      </div>
      <hr v-show="index + 1 != pendingProposals.length" />
    </div>
  </div>
</template>

<script>
import EditorTextWithTitleReadonly from "@/components/editor/EditorTextWithTitleReadonly";
import Button from "@/components/global/Button.vue";
import Textarea from "@/components/global/Textarea.vue";

export default {
  name: "PendingProposals",
  components: {
    Textarea,
    EditorTextWithTitleReadonly,
    Button,
  },
  props: {
    pendingProposals: {
      type: Array,
      default: () => [],
    },
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
.pending-proposals {
  padding-top: 24px;
  .proposal-list-wrapper {
    display: flex;
    flex-direction: column;
    hr {
      margin: 40px 0px;
      border-top: 1px solid $neutral-400;
    }
    .editor-wrapper {
      width: 100%;
      border: 1px solid $neutral-400;
      border-radius: 4px;
      padding: 0.8rem;
    }
    .feedback-wrapper {
      padding-top: 24px;
    }
    .button-wrapper {
      display: flex;
      flex-direction: row;
      column-gap: 16px;
      justify-content: flex-end;
      padding-top: 10px;
    }
  }
}
</style>
