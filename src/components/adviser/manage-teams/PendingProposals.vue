<template>
  <div class="pending-proposals">
    <div
      v-for="(proposal, index) in proposals"
      :key="proposal.id"
      class="proposal-list-wrapper"
    >
      <div class="proposal-wrapper">
        <div class="editor-wrapper">
          <EditorTextWithTitleReadonly
            :editor-data="{
              id: 'pending-proposal' + proposal.id,
              content: proposal.content,
            }"
            @input="getContent($event)"
          />
        </div>
        <div class="feedback-wrapper">
          <div class="feedback-label font-semi-bold">Feedback</div>
          <Textarea v-model="proposal.feedback.content" />
        </div>
        <div class="button-wrapper">
          <Button
            :disabled="hasApprovedProposal"
            @click="updateProposal(proposal.id, proposal.feedback, 'approved')"
          >
            Approve
          </Button>
          <Button
            color="red"
            :dark="!hasApprovedProposal"
            :disabled="hasApprovedProposal"
            @click="updateProposal(proposal.id, proposal.feedback, 'rejected')"
          >
            Reject
          </Button>
          <Button
            color="yellow"
            :dark="!hasApprovedProposal"
            :disabled="hasApprovedProposal"
            @click="updateProposal(proposal.id, proposal.feedback, 'revise')"
          >
            Ask to Revise
          </Button>
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

import { PROPOSAL } from "@/utils/constants";

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
    hasApprovedProposal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textarea: "hello",
      proposals: {},
    };
  },

  watch: {
    pendingProposals: {
      handler(newValue) {
        // console.log(this.hasApprovedProposal);
        this.proposals = newValue;
        for (const proposal of this.proposals) {
          if (!proposal.feedback) proposal.feedback = { content: "" };
        }
      },
      immediate: true,
    },
  },

  methods: {
    updateProposal(id, feedback, status) {
      switch (status) {
        case "approved":
          status = PROPOSAL.STATUS.APPROVED;
          break;
        case "rejected":
          status = PROPOSAL.STATUS.REJECTED;
          break;
        case "revise":
          status = PROPOSAL.STATUS.REVISE;
          break;
        default:
          status = "undefined status";
      }
      this.$emit("updateProposal", { id, status, feedback });
    },
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
