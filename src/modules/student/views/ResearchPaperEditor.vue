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
    <div v-for="(editor, index) in editors" :key="index" class="editor-list">
      <div class="editor-row">
        <div class="editor-profile-list">
          <div v-for="item in 3" :key="item" class="profile">
            <v-avatar size="38">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </div>
        </div>

        <div class="editor-content">
          <TextEditor
            v-if="editor.blockType === 'text'"
            :editor-data="editor"
            @input="testInput($event, index)"
          />
        </div>

        <div class="editor-controls-list">
          <Button icon @click="addEditor(index)">
            <v-icon class="editor-control-icon">mdi-plus-circle</v-icon>
          </Button>

          <Button icon @click="testMethod">
            <v-icon class="editor-control-icon">mdi-image</v-icon>
          </Button>

          <Button icon @click="testMethod">
            <v-icon class="editor-control-icon">mdi-comment-text</v-icon>
          </Button>

          <Button icon @click="testMethod">
            <v-icon class="editor-control-icon">mdi-delete</v-icon>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import TextEditor from "@/components/student/TextEditor.vue";

export default {
  name: "ResearchPaperEditor",
  components: {
    Button,
    TextEditor,
  },
  data() {
    return {
      exportItems: [{ title: "ACM" }, { title: "APA" }, { title: "MLA" }],
      editors: [],
    };
  },

  mounted() {
    if (!this.editors.length) {
      this.addEditor(0);
    }
  },

  methods: {
    testInput(event, index) {
      Object.assign(this.editors[index].content, event);
    },
    addEditor(index) {
      let id = Date.now().toString();
      this.editors.splice(index, 0, {
        id,
        content: [],
        blockType: "text",
      });
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

  .editor-row {
    display: flex;
    gap: 16px;

    .editor-profile-list {
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
    }

    .editor-controls-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid $neutral-400;
      border-radius: 4px;
      padding: 0.5rem;

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
}
</style>
