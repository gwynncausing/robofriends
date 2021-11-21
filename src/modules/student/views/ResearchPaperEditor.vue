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
        <Button text class="neutral-800--text mr-auto">Version History</Button>
        <ActiveUsersList :users="activeUsers" class="mr-4" />
        <Button>Save</Button>
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
            :editor-length="editors.length"
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
import EmptyDataResearchPaperEditor from "@/components/student/EmptyDataResearchPaperEditor";

import { mapActions, mapGetters } from "vuex";
import {
  STUDENT_ACTIONS,
  STUDENT_GETTERS,
} from "@/modules/student/store/types";
import { isObjectEmpty } from "@/utils/helpers";
import { MODULES } from "@/utils/constants";
import { IndexeddbPersistence } from "y-indexeddb";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

export default {
  name: "ResearchPaperEditor",
  components: {
    EditorDraggable,
    Button,
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
      currentSelectedObjectId: "",
      hasApprovedProposal: true,
      yDoc: new Y.Doc(),
      teamCodeUnique: "MyT3@mN@m3Unique666111",
      provider: null,
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
    console.log({ ydocid: this.yDoc.guid });
    const persistence = new IndexeddbPersistence(
      this.teamCodeUnique,
      this.yDoc
    );
    localStorage.log = "y-webrtc";
    persistence.once("synced", () => {
      this.provider = new WebrtcProvider(this.teamCodeUnique, this.yDoc, {
        signaling: ["ws://bud-api.southeastasia.cloudapp.azure.com:4444/"],
        maxConns: 200,
        peerOpts: {
          config: {
            iceServers: [
              // { urls: "stun:stun.l.google.com:19302" },
              // { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
              {
                urls: "turn:bud-api.southeastasia.cloudapp.azure.com:3478",
                credential: "budresearchbuddy!",
                username: "bud",
              },
            ],
          },
        },
      });
      const folder = this.yDoc.getArray("subdocuments");
      // folder.delete(0, folder.length);
      folder.forEach((block) => {
        block.ydoc = this.yDoc;
        // block.provider = provider;
        this.editors.push(block);
      });

      // if (!this.editors.length) {
      //   this.addEditor({
      //     currentSelectedEditorIndex: this.currentSelectedEditorIndex,
      //   });
      // }

      this.yDoc.on("update", (update, origin) => {
        console.log({ origin });
        Y.applyUpdate(this.yDoc, update);

        const folder = this.yDoc.getArray("subdocuments");
        this.editors = [];
        let objectIndex = 0;

        folder.forEach((block, index) => {
          if (block.id == this.currentSelectedObjectId) {
            objectIndex = index;
          }
          // * init block ydoc
          block.ydoc = this.yDoc;
          // block.provider = provider;
          this.editors.push(block);
        });
        // * update toolbar for changes from other peers
        if (origin != this.teamCodeUnique && this.editors.length > 0) {
          this.selectBlock(this.editors[objectIndex]);
        }
      });
    });
  },

  beforeDestroy() {
    this.yDoc.destroy();
    this.provider.destroy();
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
      try {
        const index = this.editors
          .map((editor) => editor.id)
          .indexOf(object.id);
        this.moveToolbar(object.id, index);
        this.currentSelectedObjectId = object.id;
        this.currentSelectedEditorIndex = index;
      } catch (error) {
        console.log(error);
      }
    },
    moveToolbar(id, index) {
      try {
        const editorID = "editor-" + id;
        let position = 0;

        for (let i = 0; i < this.editors.length; i++) {
          let editorID = "editor-" + this.editors[i].id;
          position += document.getElementById(editorID).clientHeight;
          if (i === index) break;
        }

        const blockHeight = document.getElementById(editorID).clientHeight;
        this.currentToolbarPosition = position - blockHeight;
      } catch (error) {
        console.log(error);
      }
    },
    getContent({ content, index }) {
      this.editors[index].content = content.content;
    },
    addEditor({ currentSelectedEditorIndex: index, blockType = "heading" }) {
      if (index === -1) return;

      let content = ``;

      // TODO: put this on a constant file
      if (blockType === "table")
        content = `
        <h2> </h2>
        <table>
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

      let objToAdd = {
        id: new Date().getTime() + blockType + this.teamCodeUnique,
        content: content,
        blockType,
        users: [],
        column: "default",
      };

      if (blockType === "heading") {
        //*add children
        objToAdd = { ...objToAdd, children: [] };
      }

      this.yDoc.transact(() => {
        const insertAt = this.editors.length > 0 ? index + 1 : 0;
        const folder = this.yDoc.getArray("subdocuments");
        folder.insert(insertAt, [objToAdd]);
      }, this.teamCodeUnique);
    },
    removeEditor({ currentSelectedEditorIndex: index = -1 }) {
      if (this.editors.length > 0) {
        this.selectBlock(this.editors[index - 1]);
      }
      if (this.editors.length > 0) {
        this.yDoc.transact(() => {
          const folder = this.yDoc.getArray("subdocuments");
          folder.delete(index, 1);
        }, this.teamCodeUnique);
      }
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
