<template>
  <div class="proposals">
    <div class="proposal-list-wrapper">
      <CardProposal
        v-for="(proposal, index) in proposals"
        :key="proposal.id"
        :proposal="proposal"
        :index="index"
        :class="{ active: activeEl == index }"
        @select="selectProposal"
      />
    </div>
    <div class="editor-wrapper">
      <div class="editor-heading">
        <Chip dark :color="statusColors[selectedProposal.status]">
          {{ selectedProposal.status }}
        </Chip>
        <!-- <router-link
          v-show="showButton(selectedProposal)"
          v-slot="{ href, navigate }"
          :to="`/student/research-details?tab=create-new&action=revise&proposal=${selectedProposal.id}`"
          custom
        >
          <Button :href="href" @click="navigate">Revise</Button>
        </router-link> -->
        <Button
          v-show="showButton(selectedProposal)"
          :disabled="hasApprovedResearch"
          @click="revise(selectedProposal)"
          >Revise</Button
        >
      </div>
      <div class="editor">
        <EditorTextWithTitleReadonly
          v-model="editor.content"
          :editor-data="editor"
        />
      </div>
      <div v-show="showFeedback(selectedProposal)" class="feedback-wrapper">
        <div class="feedback-label font-semi-bold">Feedback</div>
        <Textarea v-model="adviserFeedback" readonly />
      </div>
    </div>
  </div>
</template>

<script>
import CardProposal from "@/components/student/research-details/CardProposal";
import Chip from "@/components/global/Chip.vue";
import Button from "@/components/global/Button.vue";
import Textarea from "@/components/global/Textarea.vue";
import EditorTextWithTitleReadonly from "@/components/editor/EditorTextWithTitleReadonly";

export default {
  name: "Proposals",
  components: {
    CardProposal,
    Chip,
    Button,
    Textarea,
    EditorTextWithTitleReadonly,
  },
  props: {
    proposals: {
      type: Array,
      default: () => [],
    },
    selectedProposal: {
      type: Object,
      default: null,
    },
    hasApprovedResearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeEl: 0,
      feedback: "HEllo world",
      statusColors: {
        Pending: "blue",
        "Needs Revision": "yellow",
        Rejected: "red",
        Approved: "primary",
      },
      editor: {
        id: "proposal",
        content: null,
      },
    };
  },
  computed: {
    adviserFeedback() {
      const feedback = this.selectedProposal?.feedback?.content;
      return feedback ?? "No feedback";
    },
  },
  watch: {
    selectedProposal: {
      immediate: true,
      handler() {
        this.editor.content = this.selectedProposal.content;
      },
    },
  },
  // beforeMount() {
  //   this.editor.content = this.proposals[this.activeEl].content;
  // },
  methods: {
    selectProposal: function (index) {
      this.activeEl = index;
      // this.editor.content = this.proposals[this.activeEl].content;
      this.$emit("selectProposal", this.proposals[index]);
    },
    showFeedback: function (proposal) {
      return proposal.status === "Pending" ? false : true;
    },
    showButton: function (proposal) {
      return proposal.status === "Needs Revision" ? true : false;
    },
    revise(proposal) {
      this.$emit("reviseProposal", proposal);
      // console.log("revise");
      // window.location.href =
      //   "/student/research-details?tab=create-new&action=revise";
    },
  },
};
</script>
<style lang="scss" scoped>
.proposals {
  padding-top: 24px;
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  .proposal-list-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding: 4px;
    overflow-y: auto;
    height: 75vh;
  }
  .editor-wrapper {
    flex: 3;
    .editor-heading {
      display: flex;
      justify-content: space-between;
      padding-bottom: 8px;
    }
    .editor {
      width: 100%;
      border: 1px solid $neutral-400;
      border-radius: 4px;
      padding: 0.8rem;
    }
    .feedback-wrapper {
      padding-top: 24px;
    }
  }
}
</style>
