<template>
  <div>
    <div class="approved-research">
      <div v-if="isCompleted" class="editor-heading-completed">
        <Chip>Completed</Chip>
      </div>
      <div v-else class="editor-heading">
        <Button
          text
          class="neutral-800--text"
          :to="{ name: 'Approved Research Version History' }"
        >
          Version History
        </Button>
        <div class="buttons-users-wrapper">
          <Button v-show="!isEditable" @click="setEditable"> Edit </Button>
          <ActiveUsersList v-show="isEditable" :users="activeUsers" />
          <Button v-show="isEditable" @click="saveProposal"> Save </Button>
        </div>
      </div>
      <div class="editor-wrapper">
        <EditorTextWithTitle
          :editor-data="editor"
          :user-color="userColor"
          :is-editable="isEditable"
          :y-doc="yDoc"
          :provider="provider"
          @input="getContent($event)"
          @updateUsers="updateUsers($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditorTextWithTitle from "@/components/editor/EditorTextWithTitle";
import ActiveUsersList from "@/components/editor/ActiveUsersList.vue";
import Button from "@/components/global/Button.vue";
import Chip from "@/components/global/Chip.vue";

export default {
  name: "ApprovedResearch",
  components: {
    Chip,
    Button,
    EditorTextWithTitle,
    ActiveUsersList,
  },
  props: {
    approvedResearch: {
      type: Object,
      default: () => {},
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    provider: {
      required: true,
      type: Object,
      default: null,
    },
    yDoc: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // approvedResearch: {
      //   id: "1",
      //   researchTitle:
      //     "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
      //   content: {
      //     type: "doc",
      //     content: [
      //       {
      //         type: "heading",
      //         content: [
      //           {
      //             type: "text",
      //             text: "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
      //           },
      //         ],
      //       },
      //       {
      //         type: "paragraph",
      //         content: [
      //           {
      //             type: "text",
      //             text: "Bud is a web application that offers a modern solution where research can be fun, hassle-free, and paperless; helping students and teachers with writing research from start to finish. Inside the app, users will have access to a dashboard for monitoring their progress, can use real time collaboration features to work on their research, can utilize an easy-to-use research editor with auto-formatting to standard research formats (e.g. ACM) and can store completed research papers in the research archive. With Bud, research collaboration, tracking and writing will be made easier and enjoyable without using different applications and creating multiple files.",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
      editor: {
        id: "approved-research",
        content: {},
        users: [],
        isSafeToSetContent: false,
      },
      activeUsers: [],
    };
  },
  computed: {
    userColor() {
      return this.getRandomColor();
    },
  },
  watch: {
    "editor.isSafeToSetContent": {
      handler() {
        //* prevent from being replaced when other peers connects to webrtc and approved research is being edited
        const yxmlFragment = this.yDoc.getXmlFragment(this.editor.id);
        const hasNoContent = yxmlFragment.firstChild === null;

        if (this.editor.isSafeToSetContent && hasNoContent) {
          console.log("trying to set content");
          this.editor.replaceContent();
        }
      },
    },
    approvedResearch: {
      immediate: true,
      handler() {
        this.editor.content = this.approvedResearch.content;
      },
    },
  },
  beforeMount() {
    this.editor.newContent = this.approvedResearch.content;
  },
  methods: {
    getTitle() {
      return this.editor.content?.content?.[0]?.content?.[0]?.text;
    },
    setEditable() {
      this.$emit("setEditableClick");
      // this.isEditable = true;
    },
    updateUsers(users) {
      this.activeUsers = users;
      // console.log(users);
    },
    getContent(event) {
      this.editor.content = event;
    },
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    saveProposal() {
      const proposalContent = this.editor.content;
      this.$emit("saveProposal", {
        title: this.getTitle(),
        content: proposalContent,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.approved-research {
  padding-top: 24px;
  .editor-heading {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    .buttons-users-wrapper {
      display: flex;
      column-gap: 32px;
    }
  }
  .editor-heading-completed {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 8px;
  }
  .editor-wrapper {
    width: 100%;
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
}
</style>
