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
          <Button v-show="isEditable" @click="saveProposal"> Submit </Button>
        </div>
      </div>
      <div class="editor-wrapper">
        <EditorTextWithTitle
          v-if="isEditable"
          :editor-data="editor"
          :user-color="userColor"
          :is-editable="true"
          :y-doc="yDoc"
          :provider="provider"
          @input="getContent($event)"
          @updateUsers="updateUsers($event)"
        />
        <EditorTextWithTitleReadonly v-else :editor-data="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import EditorTextWithTitle from "@/components/editor/EditorTextWithTitle";
import EditorTextWithTitleReadonly from "@/components/editor/EditorTextWithTitleReadonly";
import ActiveUsersList from "@/components/editor/ActiveUsersList.vue";
import Button from "@/components/global/Button.vue";
import Chip from "@/components/global/Chip.vue";

export default {
  name: "ApprovedResearch",
  components: {
    Chip,
    Button,
    EditorTextWithTitle,
    EditorTextWithTitleReadonly,
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
      this.$emit("approvedProposalUsers", this.activeUsers.length);
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
