<template>
  <div class="create-new">
    <div class="editor-heading">
      <ActiveUsersList :users="activeUsers" />
    </div>
    <div class="editor-wrapper">
      <EditorTextWithTitle
        :editor-data="editor"
        :user-color="userColor"
        :is-editable="true"
        @input="getContent($event)"
        @updateUsers="updateUsers($event)"
      />
    </div>
    <div class="button-wrapper">
      <Button> Submit </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import EditorTextWithTitle from "@/components/editor/EditorTextWithTitle";
import ActiveUsersList from "@/components/editor/ActiveUsersList.vue";

export default {
  name: "CreateNew",
  components: {
    Button,
    EditorTextWithTitle,
    ActiveUsersList,
  },
  data() {
    return {
      editor: {
        id: "create-new",
        content: ``,
        users: [],
      },
      activeUsers: [],
    };
  },
  computed: {
    userColor() {
      return this.getRandomColor();
    },
  },

  methods: {
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
.create-new {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  .editor-heading {
    display: flex;
    justify-content: flex-end;
  }
  .editor-wrapper {
    width: 100%;
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
