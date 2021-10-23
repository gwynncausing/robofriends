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
            <div v-for="item in editor.users" :key="item" class="profile">
              <v-avatar size="38">
                {{ item[0] }}
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

      <div
        ref="editor-controls-list"
        class="editor-controls-list"
        :style="{ top: currentToolbarPosition + 'px' }"
      >
        <Button icon @click="addEditor(currentSelectedEditorIndex)">
          <v-icon class="editor-control-icon">mdi-plus-circle-outline</v-icon>
        </Button>

        <Button icon @click="addEditor(currentSelectedEditorIndex, 'image')">
          <v-icon class="editor-control-icon">mdi-image-outline</v-icon>
        </Button>

        <Button icon @click="testMethod">
          <v-icon class="editor-control-icon">mdi-application-outline</v-icon>
        </Button>

        <Button icon @click="testMethod">
          <v-icon class="editor-control-icon">mdi-comment-text-outline</v-icon>
        </Button>

        <Button icon @click="removeEditor(currentSelectedEditorIndex)">
          <v-icon class="editor-control-icon">mdi-delete</v-icon>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import EditorText from "@/components/student/EditorText.vue";
import EditorImage from "@/components/student/EditorImage.vue";

export default {
  name: "ResearchPaperEditor",
  components: {
    Button,
    EditorText,
    EditorImage,
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

  mounted() {
    if (!this.editors.length) {
      this.addEditor(0);
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
    addEditor(index = -1, blockType = "text") {
      if (index === -1) return;
      this.editors.splice(index + 1, 0, {
        id: this.id++,
        content: ``,
        blockType,
        users: [],
      });
    },
    removeEditor(index = -1) {
      this.editors.splice(index, 1);
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

    .editor-controls-list {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid $neutral-400;
      border-radius: 4px;
      padding: 0.5rem;
      height: 288px;
      transition: all 0.5s;

      button {
        width: 40px;

        .editor-control-icon {
          color: $neutral-700;
        }

        &:last-child {
          margin-top: auto;

          .editor-control-icon {
            color: $red;
          }
        }
      }
    }
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
          background: $primary;
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
