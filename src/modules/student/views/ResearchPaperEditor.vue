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
              Still syncing, wait for a second to avoid data loss.
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
            <v-list-item
              v-for="(item, index) in exportItems"
              :key="index"
              @click="exportFile(item.title)"
            >
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
              :provider="provider"
              :y-doc="yDoc"
              :is-editable="!isCompleted"
              @setColumn="setColumn($event)"
              @dragElement="afterDrag"
              @getContent="getContent($event)"
              @updateUsers="updateUsers($event)"
              @selectBlock="selectBlock($event)"
            />
          </div>

          <EditorToolbar
            v-if="!isCompleted"
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
import Chip from "@/components/global/Chip.vue";

import { mapActions, mapGetters } from "vuex";
import {
  STUDENT_ACTIONS,
  STUDENT_GETTERS,
} from "@/modules/student/store/types";
import { ROOT_ACTIONS, ROOT_GETTERS } from "@/store/types";
import { isObjectEmpty } from "@/utils/helpers";
import { MODULES } from "@/utils/constants";
import { IndexeddbPersistence } from "y-indexeddb";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { fromUint8Array, toUint8Array } from "js-base64";

import { ACM_FORMAT } from "@/utils/autoformatter/format-rules";
import autoformat from "@/utils/autoformatter/autoformat";

import { db } from "../../../vuefire-db";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default {
  name: "ResearchPaperEditor",
  components: {
    EditorDraggable,
    Button,
    EditorToolbar,
    ActiveUsersList,
    EmptyDataResearchPaperEditor,
    Snackbar,
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
      currentSelectedObjectId: "",
      yDoc: new Y.Doc(),
      documentCode: "MyT3@mN@m3Unique6661111",
      provider: {},
      // TODO: should find a better way to store this like a realtime.config file
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
      backups: [],
      isReceivingUpdates: false,
      cannotUpdate: false,
      lastReceivedUpdate: +new Date(),
      hasApprovedProposal: false,
      isCompleted: false,
    };
  },

  computed: {
    ...mapGetters({
      getSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS}`,
      getApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL}`,
      getUser: `${ROOT_GETTERS.GET_USER}`,
      getCurrentSchool: ROOT_GETTERS.GET_CURRENT_SCHOOL,
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
    this.provider = new WebrtcProvider(this.documentCode, this.yDoc, {
      signaling: this.signalingServer,
      maxConns: 50,
      peerOpts: this.webrtcPeerOpts,
    });
  },

  mounted() {
    // TODO: should replace localStorage call with fetch data from rtdb
    //! NOTE: the encoded base64 string can be very long and may be takeup significant space when saving large research paper content

    this.firestoreGetBackup();

    // console.log({
    //   strLength: new Blob([fromUint8Array(Y.encodeStateAsUpdate(this.yDoc))])
    //     .size,
    // });

    const persistence = new IndexeddbPersistence(this.documentCode, this.yDoc);

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
        this.isReceivingUpdates = true;
        Y.applyUpdate(this.yDoc, update);

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
        if (origin != this.documentCode && this.editors.length > 0) {
          this.selectBlock(this.editors[objectIndex]);
        }
        this.isReceivingUpdates = false;
        this.lastReceivedUpdate = +new Date();
      });
    });
  },

  beforeDestroy() {
    this.firestoreSave();
    this.yDoc.destroy();
    this.provider.destroy();
  },

  methods: {
    ...mapActions({
      onFetchApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL}`,
      onFetchCurrentSchool: ROOT_ACTIONS.FETCH_CURRENT_SCHOOL,
    }),
    firestoreSave() {
      const document = {
        key: this.documentCode,
        content: fromUint8Array(Y.encodeStateAsUpdate(this.yDoc)),
        createdAt: new Date(),
      };
      setDoc(doc(db, "backups", `${document.key}`), {
        ...document,
      });
    },
    async firestoreGetBackup() {
      const docRef = doc(db, "backups", `${this.documentCode}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Backup found!");
        Y.applyUpdate(this.yDoc, toUint8Array(docSnap.data().content));
      } else {
        console.log("No backup found!");
      }
    },
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
        id: new Date().getTime() + blockType + this.documentCode,
        content: content,
        blockType,
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
      }, this.documentCode);
    },
    removeEditor({ currentSelectedEditorIndex: index = -1 }) {
      if (this.editors.length > 0) {
        this.selectBlock(this.editors[index - 1]);
      }
      if (this.editors.length > 0) {
        this.yDoc.transact(() => {
          const folder = this.yDoc.getArray("subdocuments");
          folder.delete(index, 1);
        }, this.documentCode);
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

      //* check if there are recent updates to prevent duplicate blocks
      let canUpdate = true;
      if (+new Date() - this.lastReceivedUpdate < 2000) {
        const folder = this.yDoc.getArray("subdocuments");
        this.editors = [];
        folder.forEach((block) => {
          this.editors.push(block);
        });
        this.cannotUpdate = true;
        canUpdate = false;
      }

      const length = this.editors.length;
      let insertAt = newIndex;
      let deleteAt = oldIndex;
      const selectedBlock = this.editors[newIndex];

      //* process and broadcast positional change
      if (canUpdate) {
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
          }, this.documentCode);
        }
      }

      //* uncollapse after dropping
      //! still has some bug where it wont uncollapse
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

    async exportFile(title) {
      if (isObjectEmpty(await this.getCurrentSchool))
        await this.onFetchCurrentSchool({ schoolId: this.getUser.school });
      const currentSchool = await this.getCurrentSchool;
      const teamDetails = await this.getSelectedTeamDetails;

      if (title === "ACM")
        autoformat.generateDocument(
          ACM_FORMAT,
          this.editors,
          currentSchool,
          teamDetails
        );
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
