<template>
  <div class="create-new">
    <div class="editor-heading">
      <ActiveUsersList :users="activeUsers" />
      <Button :loading="isSubmittingProposal" @click="submitProposal">
        Submit
      </Button>
    </div>
    <div class="editor-wrapper">
      <EditorTextWithTitle
        :editor-data="editor"
        :user-color="userColor"
        is-editable
        @input="getContent($event)"
        @updateUsers="updateUsers($event)"
      />
    </div>
    <Snackbar
      content-class="neutral-800--text text-center"
      :timeout="4000"
      :is-snackbar-shown="isSnackbarShown"
      @closeSnackbar="isSnackbarShown = false"
    >
      <template v-slot:content>
        {{ snackbarMessage }}
      </template>
    </Snackbar>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import EditorTextWithTitle from "@/components/editor/EditorTextWithTitle";
import ActiveUsersList from "@/components/editor/ActiveUsersList.vue";
import Snackbar from "@/components/Snackbar";

import { isEmptyOrWhiteSpaces } from "@/utils/helpers";

export default {
  name: "CreateNew",
  components: {
    Button,
    EditorTextWithTitle,
    ActiveUsersList,
    Snackbar,
  },
  props: {
    proposal: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      editor: {
        id: "create-new",
        content: ``,
        users: [],
      },
      activeUsers: [],
      isSubmittingProposal: false,
      isSnackbarShown: false,
      snackbarMessage: "",
    };
  },
  computed: {
    userColor() {
      return this.getRandomColor();
    },
  },

  beforeMount() {
    console.log("I am here");
    // console.log(this.proposal);
    this.editor.content = this.proposal;
    // console.log(this.editor.content);
    // console.log(this.proposal.content);
    // this.proposal.content ??= this.editor.content;
    // console.log(this.proposal.content);
  },

  methods: {
    getTitle() {
      return this.editor.content?.content?.[0]?.content?.[0]?.text;
    },
    updateUsers(users) {
      this.activeUsers = users;
      // console.log(users);
    },
    getContent(event) {
      this.editor.content = event;
      console.log(event);
    },
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    async submitProposal() {
      if (!isEmptyOrWhiteSpaces(this.getTitle())) {
        const payload = {
          title: this.getTitle(),
          content: this.editor.content,
        };
        this.$emit("submit", payload);
      } else {
        this.isSnackbarShown = true;
        this.snackbarMessage = "Your proposal must have a title.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-new {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  .editor-heading {
    display: flex;
    column-gap: 32px;
    justify-content: flex-end;
  }
  .editor-wrapper {
    width: 100%;
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
}
</style>
