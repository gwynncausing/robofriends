<template>
  <div id="editor">
    <!-- // * make this hasApprovedProposal to true to check/see the editor -->
    <div v-if="!hasApprovedProposal">
      <EmptyDataResearchPaperEditor />
    </div>
    <div v-else class="editor-wrapper">
      <Snackbar
        :is-snackbar-shown="cannotUpdate"
        @closeSnackbar="cannotUpdate = false"
      >
        <template v-slot:content>
          <div>
            <p class="black--text ma-auto">
              Please wait for your team to finish typing.
            </p>
          </div>
        </template>
      </Snackbar>
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
              :provider="provider"
              :y-doc="yDoc"
              @setColumn="setColumn($event)"
              @dragElement="afterDrag"
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
import EmptyDataResearchPaperEditor from "@/components/messages/EmptyDataResearchPaperEditor";
import Snackbar from "@/components/Snackbar";

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
// import { fromUint8Array, toUint8Array } from "js-base64";

export default {
  name: "ResearchPaperEditor",
  components: {
    EditorDraggable,
    Button,
    EditorToolbar,
    ActiveUsersList,
    EmptyDataResearchPaperEditor,
    Snackbar,
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
      provider: {},
      signalingServers: ["ws://bud-api.southeastasia.cloudapp.azure.com:4444/"],
      webrtcPeerOpts: {
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
      isReceivingUpdates: false,
      cannotUpdate: false,
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

  beforeMount() {
    // TODO: if ydoc is empty, it should check firebase server for existing content when other peers are offline
    this.provider = new WebrtcProvider(this.teamCodeUnique, this.yDoc, {
      signaling: this.signalingServer,
      maxConns: 200,
      peerOpts: this.webrtcPeerOpts,
    });
  },

  mounted() {
    // TODO: should replace localStorage call with fetch data from rtdb
    //! NOTE: the encoded base64 string can be very long and may be takeup significant space when saving large research paper content
    // Y.applyUpdate(this.yDoc, toUint8Array(localStorage.lastYDocState));

    // console.log({
    //   strLength: new Blob([fromUint8Array(Y.encodeStateAsUpdate(this.yDoc))])
    //     .size,
    // });

    const persistence = new IndexeddbPersistence(
      this.teamCodeUnique,
      this.yDoc
    );

    //*set to y-webrtc to see logs of webrtc connection for yjs
    localStorage.log = "false";

    persistence.once("synced", () => {
      const folder = this.yDoc.getArray("subdocuments");

      //* force delete all contents
      // folder.delete(0, folder.length);

      //* initialize editors
      folder.forEach((block) => {
        // *pass reference to parent ydoc
        // block.ydoc = this.yDoc;
        this.editors.push(block);
      });

      //* turned off for now
      // if (this.editors.length === 0) {
      //   this.addEditor({
      //     currentSelectedEditorIndex: this.currentSelectedEditorIndex,
      //   });
      // }

      //* on receiving updates from other peers
      this.yDoc.on("update", (update, origin) => {
        Y.applyUpdate(this.yDoc, update);
        this.isReceivingUpdates = true;

        const folder = this.yDoc.getArray("subdocuments");
        this.editors = [];
        let objectIndex = 0;

        folder.forEach((block, index) => {
          if (block.id == this.currentSelectedObjectId) {
            objectIndex = index;
          }
          // *pass reference to parent ydoc
          // block.ydoc = this.yDoc;
          this.editors.push(block);
        });
        // * update toolbar pos based on changes
        if (origin != this.teamCodeUnique && this.editors.length > 0) {
          this.selectBlock(this.editors[objectIndex]);
        }
        this.isReceivingUpdates = false;
      });
    });
  },

  beforeDestroy() {
    // TODO: replace localStorage with save to rtdb
    // localStorage.lastYDocState = fromUint8Array(
    //   Y.encodeStateAsUpdate(this.yDoc)
    // );
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
    afterDrag(newIndex, oldIndex, childrenCount) {
      //TODO: when receiving update, show error and do not update, instead reset the editor back like this:
      //TODO: show error also and reposition toolbar
      if (this.isReceivingUpdates) {
        const folder = this.yDoc.getArray("subdocuments");
        this.editors = [];
        folder.forEach((block) => {
          this.editors.push(block);
        });
        this.cannotUpdate = true;
        return;
      }

      const length = this.editors.length;
      let insertAt = newIndex;
      let deleteAt = oldIndex;
      const selectedBlock = this.editors[newIndex];
      if (oldIndex === length - 1) {
        deleteAt = length;
      } else if (oldIndex > newIndex) {
        oldIndex++;
        deleteAt = oldIndex + childrenCount;
      } else if (oldIndex < newIndex) {
        insertAt++;
      }

      if (newIndex !== oldIndex) {
        const objectsToInsert =
          childrenCount > 0
            ? [
                this.editors[newIndex],
                ...this.editors.slice(oldIndex, oldIndex + childrenCount),
              ]
            : [this.editors[newIndex]];
        this.yDoc.transact(() => {
          const folder = this.yDoc.getArray("subdocuments");
          folder.insert(insertAt, objectsToInsert);
          document;
          folder.delete(deleteAt, childrenCount + 1);
        }, this.teamCodeUnique);
      }

      const parentIndex = this.editors.findIndex(
        (block) => block.id === selectedBlock.id
      );
      if (parentIndex !== length - 1 && selectedBlock.blockType === "heading") {
        document
          .getElementById("toggle-" + selectedBlock.id)
          .classList.add("down");
        for (let i = parentIndex + 1; i < this.editors.length; i++) {
          const block = this.editors[i];
          if (
            block.blockType === "heading" &&
            selectedBlock.content[0].attrs.level >= block.content[0].attrs.level
          ) {
            break;
          } else {
            const element = document.getElementById("editor-" + block.id);
            element.style.display = "block";
          }
        }
      }
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
