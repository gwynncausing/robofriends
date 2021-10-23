<template>
  <div id="editor">
    <div class="editor-heading">
      <Button text class="neutral-800--text">Version History</Button>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <Button outlined v-bind="attrs" v-on="on">
            Export
            <v-icon>mdi-chevron-down</v-icon>
          </Button>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in exportItems" :key="index" link>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="editor-list-wrapper">
      <div class="editor-list">
        <div
          v-for="(editor, index) in editors"
          :id="'editor-' + editor.id"
          :key="editor.id"
          class="editor-row"
        >
          <div class="editor-profile-list">
            <div
              v-for="item in editor.users"
              :key="item"
              class="profile"
              :style="{ backgroundColor: userColor }"
            >
              <v-avatar size="38">
                {{ item.split(" ")[0][0] }} {{ item.split(" ")[1][0] }}
              </v-avatar>
            </div>
          </div>
          <div class="editor-content">
            <EditorText
              v-if="editor.blockType === 'text'"
              :editor-data="editor"
              @input="getContent($event, index)"
              @userFocus="addUser($event)"
              @userBlur="removeUser($event)"
            />
            <EditorImage
              v-if="editor.blockType === 'image'"
              :editor-data="editor"
              @input="getContent($event, index)"
              @userFocus="addUser($event)"
              @userBlur="removeUser($event)"
            />
          </div>
        </div>
      </div>
      <EditorToolbar
        :current-toolbar-position="currentToolbarPosition"
        :current-selected-editor-index="currentSelectedEditorIndex"
        @addEditor="addEditor($event)"
        @removeEditor="removeEditor($event)"
      />
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import EditorText from "@/components/student/EditorText.vue";
import EditorImage from "@/components/student/EditorImage.vue";
import EditorToolbar from "@/components/student/EditorToolbar.vue";

export default {
  name: "ResearchPaperEditor",
  components: {
    Button,
    EditorText,
    EditorImage,
    EditorToolbar,
  },
  data() {
    return {
      exportItems: [{ title: "ACM" }, { title: "APA" }, { title: "MLA" }],
      editors: [],
      id: 123,
      currentToolbarPosition: 0,
      currentSelectedEditorIndex: 0,
    };
  },

  computed: {
    userColor() {
      return this.getRandomColor();
    },
  },

  mounted() {
    if (!this.editors.length) {
      this.addEditor({
        currentSelectedEditorIndex: this.currentSelectedEditorIndex,
      });
    }
  },

  methods: {
    removeUser(object) {
      const index = this.editors.map((editor) => editor.id).indexOf(object.id);
      if (index === -1) return;

      this.editors[index].users = this.editors[index].users.splice(index, 1);

      const hasVal = Object.values(this.editors[index].users).includes(
        object.name
      );
      if (hasVal) this.editors[index].users.splice(index, 1);
    },
    addUser(object) {
      const index = this.editors.map((editor) => editor.id).indexOf(object.id);
      const hasVal = Object.values(this.editors[index].users).includes(
        object.name
      );
      if (!hasVal) this.editors[index].users.push(object.name);

      this.moveToolbar(object.id, index);
      this.currentSelectedEditorIndex = index;
    },
    moveToolbar(id, index) {
      const editorID = "editor-" + id;
      let position = 0;

      for (let i = 0; i < this.editors.length; i++) {
        let editorID = "editor-" + this.editors[i].id;
        position += document.getElementById(editorID).clientHeight;
        if (i === index) break;
        position += 24;
      }

      const blockHeight = document.getElementById(editorID).clientHeight;
      this.currentToolbarPosition = position - blockHeight;
    },
    getContent(event, index) {
      this.editors[index].content = event;
    },
    addEditor({ currentSelectedEditorIndex: index, blockType = "text" }) {
      if (index === -1) return;
      this.editors.splice(index + 1, 0, {
        id: this.id++,
        content: ``,
        blockType,
        users: [],
      });
    },
    removeEditor({ currentSelectedEditorIndex: index = -1 }) {
      this.editors.splice(index, 1);
    },
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    testMethod() {
      console.log("testMethod called");
    },
  },
};
</script>

<style lang="scss" scoped>
#editor {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .editor-heading {
    display: flex;
    justify-content: space-between;
  }

  .editor-list-wrapper {
    position: relative;
  }

  .editor-list {
    display: flex;
    gap: 24px;
    flex-direction: column;

    .editor-row {
      display: flex;
      gap: 16px;

      .editor-profile-list {
        width: 52px;
        display: flex;
        gap: 10px;
        flex-direction: column;

        .profile {
          width: 42px;
          height: 42px;
          background-color: $primary;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      }

      .editor-content {
        width: 100%;
        border: 1px solid $neutral-400;
        border-radius: 4px;
        padding: 0.5rem;
        min-height: 18rem; // 304px
        margin-right: 76px;
      }
    }
  }
}
</style>
