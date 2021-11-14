<template>
  <!-- <div id="editor">
    <div class="editor-heading">
      <Button text class="neutral-800--text mr-auto">Version History</Button>
      <ActiveUsersList :users="activeUsers" class="mr-4" />
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
          <div v-if="editor.blockType === 'text'" class="editor-content-text">
            <EditorText
              :editor-data="editor"
              :user-color="userColor"
              @input="getContent($event, index)"
              @updateUsers="updateUsers($event)"
              @selectBlock="selectBlock($event)"
            />
          </div>
          <div
            v-else-if="editor.blockType === 'image'"
            class="editor-content-image"
          >
            <EditorImage
              :editor-data="editor"
              :user-color="userColor"
              @input="getContent($event, index)"
              @updateUsers="updateUsers($event)"
              @selectBlock="selectBlock($event)"
              @setColumnNumber="setColumnNumber($event, editor)"
            />
          </div>
          <div
            v-else-if="editor.blockType === 'heading'"
            class="editor-content-heading"
          >
            <EditorHeading
              :editor-data="editor"
              :user-color="userColor"
              @input="getContent($event, index)"
              @updateUsers="updateUsers($event)"
              @selectBlock="selectBlock($event)"
            />
          </div>
          <div
            v-else-if="editor.blockType === 'table'"
            class="editor-content-table"
          >
            <EditorTable
              :editor-data="editor"
              :user-color="userColor"
              @input="getContent($event, index)"
              @updateUsers="updateUsers($event)"
              @selectBlock="selectBlock($event)"
              @setColumnNumber="setColumnNumber($event, editor)"
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
  </div> -->
  <div id="editor">
    <div class="editor-heading">
      <Button text class="neutral-800--text mr-auto">Version History</Button>
      <ActiveUsersList :users="activeUsers" class="mr-4" />
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
    <!-- // * make this hasApprovedProposal to true to check/see the editor -->
    <div v-if="hasApprovedProposal">
      <EmptyDataResearchPaperEditor />
    </div>
    <div class="editor-list-wrapper">
      <div class="editor-list">
        <div class="editor-row">
          <EditorDraggable
            :list="editors"
            :user-color="userColor"
            @setColumn="setColumn($event)"
            @dragElement="testMethod"
            @getContent="getContent($event)"
            @updateUsers="updateUsers($event)"
            @selectBlock="selectBlock($event)"
          />
        </div>

        <EditorToolbar
          :current-toolbar-position="currentToolbarPosition"
          :current-selected-editor-index="currentSelectedEditorIndex"
          @addEditor="addEditor($event)"
          @removeEditor="removeEditor($event)"
        />
      </div>

      <!-- <div class="editor-list-wrapper">
        <div class="editor-list">
          <div
            v-for="(editor, index) in editors"
            :id="'editor-' + editor.id"
            :key="editor.id"
            class="editor-row"
          >
            <div v-if="editor.blockType === 'text'" class="editor-content-text">
              <EditorText
                :editor-data="editor"
                :user-color="userColor"
                @input="getContent($event, index)"
                @updateUsers="updateUsers($event)"
                @selectBlock="selectBlock($event)"
              />
            </div>
            <div
              v-else-if="editor.blockType === 'image'"
              class="editor-content-image"
            >
              <EditorImage
                :editor-data="editor"
                :user-color="userColor"
                @input="getContent($event, index)"
                @updateUsers="updateUsers($event)"
                @selectBlock="selectBlock($event)"
              />
            </div>
            <div
              v-else-if="editor.blockType === 'section'"
              class="editor-content-section"
            >
              <EditorSection
                :editor-data="editor"
                :user-color="userColor"
                @input="getContent($event, index)"
                @updateUsers="updateUsers($event)"
                @selectBlock="selectBlock($event)"
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
      </div> -->
    </div>
  </div>
</template>

<script>
import EditorDraggable from "@/components/editor/EditorDraggable.vue";
import Button from "@/components/global/Button.vue";
// import EditorText from "@/components/editor/EditorText.vue";
// import EditorImage from "@/components/editor/EditorImage.vue";
// import EditorSection from "@/components/editor/EditorSection.vue";
import EditorToolbar from "@/components/editor/EditorToolbar.vue";
import ActiveUsersList from "@/components/editor/ActiveUsersList.vue";
import EmptyDataResearchPaperEditor from "@/components/student/EmptyDataResearchPaperEditor";

import { mapActions, mapGetters } from "vuex";
import {
  STUDENT_ACTIONS,
  STUDENT_GETTERS,
} from "@/modules/student/store/types";
import { isObjectEmpty } from "@/utils/helpers";
import { MODULES } from "@/utils/constants";

export default {
  name: "ResearchPaperEditor",
  components: {
    EditorDraggable,
    Button,
    // EditorText,
    // EditorImage,
    // EditorSection,
    EditorToolbar,
    ActiveUsersList,
    EmptyDataResearchPaperEditor,
  },
  data() {
    return {
      exportItems: [{ title: "ACM" }, { title: "APA" }, { title: "MLA" }],
      editors: [],
      id: 123,
      activeUsers: [],
      currentToolbarPosition: 0,
      currentSelectedEditorIndex: 0,
      hasApprovedProposal: false,
    };
  },

  computed: {
    ...mapGetters({
      getSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS}`,
      getApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL}`,
    }),
    userColor() {
      return this.getRandomColor();
    },
  },

  created() {
    this.setHasApprovedProposal();
  },

  mounted() {
    if (!this.editors.length) {
      this.addEditor({
        currentSelectedEditorIndex: this.currentSelectedEditorIndex,
      });
    }
  },

  methods: {
    ...mapActions({
      onFetchApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL}`,
    }),
    async setHasApprovedProposal() {
      try {
        await this.onFetchApprovedProposal({
          id: this.getSelectedTeamDetails.id,
        });
        if (!isObjectEmpty(this.getApprovedProposal))
          this.hasApprovedProposal = true;
      } catch (error) {
        // TODO: Improve api error handling
        console.log(error);
      }
    },
    updateUsers(users) {
      this.activeUsers = users;
    },
    selectBlock(object) {
      const index = this.editors.map((editor) => editor.id).indexOf(object.id);
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
        // position += 24;
      }

      const blockHeight = document.getElementById(editorID).clientHeight;
      this.currentToolbarPosition = position - blockHeight;
    },
    getContent({ content, index }) {
      this.editors[index].content = content;
    },
    addEditor({ currentSelectedEditorIndex: index, blockType = "heading" }) {
      if (index === -1) return;
      let content = ``;
      if (blockType === "table")
        content = `<table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>`;

      if (blockType === "heading") {
        this.editors.splice(index + 1, 0, {
          id: this.id++,
          content: content,
          blockType,
          users: [],
          children: [],
          column: "default",
        });
      } else {
        this.editors.splice(index + 1, 0, {
          id: this.id++,
          content: content,
          blockType,
          users: [],
          column: "default",
        });
      }
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
    setColumn({ column, editor }) {
      editor.column = column;
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
    // justify-content: space-between;
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
      margin-right: 76px;
    }

    //   div[class^="editor-content-"] {
    //     width: 100%;
    //     border: 1px solid $neutral-400;
    //     border-radius: 4px;
    //     padding: 0.8rem;
    //     margin-right: 76px;
    //   }
    //   .editor-content-section {
    //     height: 42px;
    //     padding: 4px;
    //   }

    //   .editor-content-text,
    //   .editor-content-image {
    //     min-height: 18rem; // 304px
    //   }
    // }
  }
}
</style>
