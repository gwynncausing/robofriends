<template>
  <div>
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
    <EditorTextFormatterButtons :editor="editor" />
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import EditorTextFormatterButtons from "./EditorTextFormatterButtons";

import { mapGetters } from "vuex";
import { GETTERS } from "@/store/types/getters";

// A new Y document
// const ydoc = new Y.Doc();
// Registered with a WebRTC provider
// new WebrtcProvider("bud-test-1", ydoc);

export default {
  components: {
    EditorTextFormatterButtons,
    EditorContent,
  },

  props: {
    editorData: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      editor: null,
      content: "",
      users: [],
    };
  },

  computed: {
    ...mapGetters({
      getUser: `${GETTERS.GET_USER}`,
    }),
  },

  watch: {
    content(newVal) {
      console.log(newVal);
    },
  },

  mounted() {
    const ydoc = new Y.Doc();

    const documentId = this.editorData.id;

    const name = `${this.getUser.firstName} ${this.getUser.lastName}`;
    let content = this.editorData.content;

    const provider = new WebrtcProvider(documentId + "", ydoc);

    try {
      this.editor = new Editor({
        extensions: [
          Document,
          Paragraph,
          Text,
          Bold,
          Italic,
          Strike,
          Code,
          BulletList,
          ListItem,
          Underline,
          Superscript,
          Subscript,
          Dropcursor,
          Image,
          Heading.configure({
            levels: [1, 2, 3, 4],
          }),
          Collaboration.configure({
            document: ydoc,
          }),
          CollaborationCursor.configure({
            provider: provider,
            user: {
              name,
              color: this.getRandomColor(),
            },
            onUpdate: (users) => {
              // Object.assign(this.users, users);
              this.users = users;
              // console.log(documentId, " users", users);
            },
          }),
        ],
        content: content,
        onUpdate: () => {
          this.$emit("input", this.editor.getJSON());
        },
        onFocus: () => {
          this.$emit("userFocus", {
            name,
            id: this.editorData.id,
          });
        },
        onBlur: () => {
          this.$emit("userBlur", {
            name,
            id: this.editorData.id,
          });
        },
      });
    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
