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
        <Chip dark :color="statusColors[proposals[activeEl].status]">
          {{ proposals[activeEl].status }}
        </Chip>
        <router-link
          v-slot="{ href, navigate }"
          to="/student/research-details?tab=create-new"
          custom
        >
          <Button :href="href" @click="navigate">Revise</Button>
        </router-link>
      </div>
      <div class="editor">
        <EditorTextWithTitleReadonly
          v-model="editor.content"
          :editor-data="editor"
        />
      </div>
      <div v-show="showFeedback(proposals[activeEl])" class="feedback-wrapper">
        <div class="feedback-label font-semi-bold">Feedback</div>
        <Textarea v-model="proposals[activeEl].feedback.text" readonly />
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
  data() {
    return {
      activeEl: 0,
      proposals: [
        {
          id: "1",
          researchTitle:
            "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
          content: {
            type: "doc",
            content: [
              {
                type: "heading",
                content: [
                  {
                    type: "text",
                    text: "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Bud is a web application that offers a modern solution where research can be fun, hassle-free, and paperless; helping students and teachers with writing research from start to finish. Inside the app, users will have access to a dashboard for monitoring their progress, can use real time collaboration features to work on their research, can utilize an easy-to-use research editor with auto-formatting to standard research formats (e.g. ACM) and can store completed research papers in the research archive. With Bud, research collaboration, tracking and writing will be made easier and enjoyable without using different applications and creating multiple files.",
                  },
                ],
              },
            ],
          },
          status: "Needs Revision",
          dateTime: "",
          feedback: {
            id: "1",
            date: "1/1/2021",
            time: "11:00",
            text: "Good job!",
          },
        },
        {
          id: "2",
          researchTitle:
            "Isolation and Determination of the Bioremediation Potential of Bunker Sludge Degrading Bacteria from Manila Bay",
          content: {
            type: "doc",
            content: [
              {
                type: "heading",
                content: [
                  {
                    type: "text",
                    text: "Isolation and Determination of the Bioremediation Potential of Bunker Sludge Degrading Bacteria from Manila Bay",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Bunker sludge degrading microorganisms were isolated using enrichment culture technique from the polluted waters of Manila Bay. Water samples were inoculated using liquid mineral media (LAM). Isolates were tentatively identified as Xanthomonas sp.,Alcaligenes sp, Enterobacter sp. and Flavobacterium sp. Two parameters were tested evaluating the biodegradative abilities of individual isolates to degrade bunker sludge and the effect of chicken manure as added source of nitrates and phosphates. Results revealed no significant difference between pure and mixed cultures in ability to degrade",
                  },
                ],
              },
            ],
          },
          status: "Rejected",
          dateTimeSubmitted: "",
          feedback: {
            id: "1",
            date: "1/1/2021",
            time: "11:00",
            text: "Please brainstorm for another idea.",
          },
        },
      ],
      statusColors: {
        Pending: "blue",
        "Needs Revision": "yellow",
        Rejected: "red",
        Approved: "primary",
      },
      editor: {
        id: "proposal",
        content: ``,
      },
    };
  },
  beforeMount() {
    this.editor.content = this.proposals[this.activeEl].content;
  },
  methods: {
    selectProposal: function (index) {
      this.activeEl = index;
      this.editor.content = this.proposals[this.activeEl].content;
    },
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
