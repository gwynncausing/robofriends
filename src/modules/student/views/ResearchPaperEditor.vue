<template>
  <div id="editor">
    <!-- // * make this hasApprovedProposal to true to check/see the editor -->
    <div v-if="!hasApprovedProposal">
      <EmptyDataResearchPaperEditor />
    </div>
    <div v-else class="editor-wrapper">
      <div class="editor-heading">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <Button outlined v-bind="attrs" class="mr-4" v-on="on">
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
        <Button v-if="!isCompleted" text class="neutral-800--text mr-auto">
          Version History
        </Button>
        <ActiveUsersList
          v-if="!isCompleted"
          :users="activeUsers"
          class="mr-4"
        />
        <Button v-if="!isCompleted">Save</Button>
        <Chip v-if="isCompleted" class="ml-auto">Completed</Chip>
      </div>
      <div class="editor-list-wrapper">
        <div class="editor-list">
          <div class="editor-row">
            <EditorDraggable
              :list="editors"
              :user-color="userColor"
              :is-editable="!isCompleted"
              @setColumn="setColumn($event)"
              @dragElement="testMethod"
              @getContent="getContent($event)"
              @updateUsers="updateUsers($event)"
              @selectBlock="selectBlock($event)"
            />
          </div>

          <EditorToolbar
            v-if="!isCompleted"
            :current-toolbar-position="currentToolbarPosition"
            :current-selected-editor-index="currentSelectedEditorIndex"
            @addEditor="addEditor($event)"
            @removeEditor="removeEditor($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditorDraggable from "@/components/editor/EditorDraggable.vue";
import Button from "@/components/global/Button.vue";
import EditorToolbar from "@/components/editor/EditorToolbar.vue";
import ActiveUsersList from "@/components/editor/ActiveUsersList.vue";
import EmptyDataResearchPaperEditor from "@/components/messages/EmptyDataResearchPaperEditor";
import Chip from "@/components/global/Chip.vue";

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
    EditorToolbar,
    ActiveUsersList,
    EmptyDataResearchPaperEditor,
    Chip,
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
      isCompleted: false,
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
      this.editors[index].content = content.content;
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
  .editor-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .editor-heading {
    display: flex;
    align-items: center;
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
  }
}
</style>
