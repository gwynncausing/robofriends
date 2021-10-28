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
      research: {
        id: "1",
        title: "title",
        description: "description",
        teamName: "Cary & Co.",
        status: "Returned", // ? values: Pending, Approved, Returned
        objectives: ["obj1", "obj2"],
        feedback: {
          id: "1",
          date: "1/1/2021",
          time: "11:00",
          text: "Good job!",
        },
      },
      editor: {
        id: "approved-research",
        content: `aa`,
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
