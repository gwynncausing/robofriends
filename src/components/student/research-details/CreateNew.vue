<template>
  <div class="create-new">
    <Yaaaay v-if="isCompleted" @showDialog="joinTeamModal = true" />
    <div v-else class="create-new-editor">
      <div class="editor-heading">
        <ActiveUsersList :users="activeUsers" />
        <Button :loading="isSubmittingProposal" @click="submitProposal">
          Submit
        </Button>
      </div>
      <div class="editor-wrapper">
        <EditorTextWithTitle
          :editor-data="editor"
          :user-color="userColor"
          :y-doc="yDoc"
          :provider="provider"
          is-editable
          @input="getContent($event)"
          @updateUsers="updateUsers($event)"
        />
      </div>
      <Snackbar
        content-class="neutral-800--text text-center"
        :timeout="4000"
        :is-snackbar-shown="isSnackbarShown"
        @closeSnackbar="isSnackbarShown = false"
      >
        <template v-slot:content>
          {{ snackbarMessage }}
        </template>
      </Snackbar>
    </div>
    <ModalJoinTeam
      :dialog-props="joinTeamModal"
      :is-loading="isSubmitTeamCode"
      @dialogClose="joinTeamModal = $event"
      @dialogJoinTeam="joinTeam($event)"
    />
  </div>
</template>

<script>
import ModalJoinTeam from "@/components/modals/ModalJoinTeam.vue";
import Yaaaay from "@/components/messages/Yaaaay.vue";
import Button from "@/components/global/Button.vue";
import EditorTextWithTitle from "@/components/editor/EditorTextWithTitle";
import ActiveUsersList from "@/components/editor/ActiveUsersList.vue";
import Snackbar from "@/components/Snackbar";

import { isEmptyOrWhiteSpaces } from "@/utils/helpers";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";
import { isObjectEmpty } from "@/utils/helpers";

export default {
  name: "CreateNew",
  components: {
    Yaaaay,
    ModalJoinTeam,
    Button,
    EditorTextWithTitle,
    ActiveUsersList,
    Snackbar,
  },
  props: {
    proposal: {
      type: Object,
      default: () => ({}),
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: {
        id: "create-new",
        content: ``,
        users: [],
      },
      activeUsers: [],
      isSubmittingProposal: false,
      isSnackbarShown: false,
      snackbarMessage: "",
      joinTeamModal: false,
      isSubmitTeamCode: false,
      documentCode: "MyT3@mN@m3Unique6661111" + "-create-proposal",
      yDoc: new Y.Doc(),
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
    };
  },
  computed: {
    userColor() {
      return this.getRandomColor();
    },
  },
  beforeMount() {
    // console.log(this.proposal);
    this.editor.toBeRevised = this.proposal;
    // console.log(this.editor.content);
    // console.log(this.proposal.content);
    // this.proposal.content ??= this.editor.content;
    // console.log(this.proposal.content);
    // TODO: determine whether this needs an implicit backup wth firestore
    this.provider = new WebrtcProvider(this.documentCode, this.yDoc, {
      signaling: this.signalingServer,
      maxConns: 50,
      peerOpts: this.webrtcPeerOpts,
    });
    this.editor.db = new IndexeddbPersistence(this.documentCode, this.yDoc);
    this.editor.db.on("synced", () => {
      if (!isObjectEmpty(this.proposal)) {
        this.editor.replaceContent();
        this.$emit("reset");
      }
    });
  },

  methods: {
    getTitle() {
      return this.editor.content?.content?.[0]?.content?.[0]?.text;
    },
    updateUsers(users) {
      this.activeUsers = users;
      // console.log(users);
    },
    getContent(event) {
      this.editor.content = event;
      // console.log(event);
    },
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    async submitProposal() {
      if (!isEmptyOrWhiteSpaces(this.getTitle())) {
        const payload = {
          title: this.getTitle(),
          content: this.editor.content,
        };
        this.$emit("submit", payload);
        this.editor.clearContent();
      } else {
        this.isSnackbarShown = true;
        this.snackbarMessage = "Your proposal must have a title.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-new-editor {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  .editor-heading {
    display: flex;
    column-gap: 32px;
    justify-content: flex-end;
  }
  .editor-wrapper {
    width: 100%;
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
}
</style>
