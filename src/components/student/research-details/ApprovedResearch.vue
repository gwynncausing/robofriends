<template>
  <div class="approved-research">
    <div class="editor-heading">
      <Button text class="neutral-800--text"> Version History </Button>
      <div class="buttons-users-wrapper">
        <Button v-show="!isEditable" @click="setEditable()"> Edit </Button>
        <ActiveUsersList v-show="isEditable" :users="activeUsers" />
        <Button v-show="isEditable"> Save </Button>
      </div>
    </div>
    <div class="editor-wrapper">
      <EditorTextWithTitle
        :editor-data="editor"
        :user-color="userColor"
        :is-editable="isEditable"
        @input="getContent($event)"
        @updateUsers="updateUsers($event)"
      />
    </div>
  </div>
</template>

<script>
import EditorTextWithTitle from "@/components/editor/EditorTextWithTitle";
import ActiveUsersList from "@/components/editor/ActiveUsersList.vue";
import Button from "@/components/global/Button.vue";
export default {
  name: "ApprovedResearch",
  components: {
    Button,
    EditorTextWithTitle,
    ActiveUsersList,
  },
  data() {
    return {
      approvedResearch: {
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
      },
      editor: {
        id: "approved-research",
        content: {},
        users: [],
      },
      activeUsers: [],
      isEditable: false,
    };
  },
  computed: {
    userColor() {
      return this.getRandomColor();
    },
  },
  beforeMount() {
    this.editor.content = this.approvedResearch.content;
  },

  methods: {
    setEditable() {
      this.isEditable = true;
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
  .editor-wrapper {
    width: 100%;
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
}
</style>
