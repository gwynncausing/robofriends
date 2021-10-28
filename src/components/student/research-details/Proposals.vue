<template>
  <div class="proposals">
    <div v-for="proposal in proposals" :key="proposal.id">
      <div class="proposal-list-wrapper">
        {{ proposal.title }}
      </div>
      <div class="editor">
        <div class="editor-heading">
          <Chip dark :color="statusColors[proposal.status]">
            {{ proposal.status }}
          </Chip>
          <Button v-show="showButton(proposal)">Edit</Button>
        </div>
        <div class="editor-wrapper">
          <EditorTextWithTitleReadonly
            :editor-data="{ id: proposal.id, content: proposal.content }"
            @input="getContent($event)"
          />
        </div>
        <div v-show="showFeedback(proposal)" class="feedback-wrapper">
          <div class="feedback-label font-semi-bold">Feedback</div>
          <Textarea v-model="proposal.feedback.text" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chip from "@/components/global/Chip.vue";
import Button from "@/components/global/Button.vue";
import Textarea from "@/components/global/Textarea.vue";
import EditorTextWithTitleReadonly from "@/components/editor/EditorTextWithTitleReadonly";
export default {
  name: "Proposals",
  components: {
    Chip,
    Button,
    Textarea,
    EditorTextWithTitleReadonly,
  },
  data() {
    return {
      proposals: [
        {
          id: "1",
          title: "title1",
          content: `<h2>title1</h2><p>paragraph1</p>`,
          status: "Needs Revision",
          dateTimeSubmitted: "",
          feedback: {
            id: "1",
            date: "1/1/2021",
            time: "11:00",
            text: "Good job!",
          },
        },
        {
          id: "2",
          title: "title2",
          content: `<h2>title2</h2><p>paragraph2</p>`,
          status: "Rejected",
          dateTimeSubmitted: "",
          feedback: {
            id: "1",
            date: "1/1/2021",
            time: "11:00",
            text: "Good job!",
          },
        },
      ],
      statusColors: {
        Pending: "blue",
        "Needs Revision": "yellow",
        Rejected: "red",
        Approved: "primary",
      },
    };
  },
  methods: {
    showFeedback: function (proposal) {
      return proposal.status === "Pending" ? false : true;
    },
    showButton: function (proposal) {
      return proposal.status === "Needs Revision" ? true : false;
    },
  },
};
</script>
<style lang="scss" scoped>
.proposals {
  padding-top: 24px;
  .editor-heading {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
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
}
</style>
