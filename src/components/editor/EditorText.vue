<template>
  <div class="editor-text">
    <EditorTextFormatterButtons
      :editor="editor"
      :block-type="editorData.blockType"
    />
    <editor-content :editor="editor" class="editor-content" />
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
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import EditorTextFormatterButtons from "./EditorTextFormatterButtons";

import { mapGetters } from "vuex";
import { ROOT_GETTERS } from "@/store/types";

// A new Y document
// const ydoc = new Y.Doc();
// Registered with a WebRTC provider
// new WebrtcProvider("bud-test-1", ydoc);
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

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
    userColor: {
      type: String,
      default: "#FFF",
    },
    isEditable: {
      required: true,
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      editor: null,
      content: "",
    };
  },

  computed: {
    ...mapGetters({
      getUser: `${ROOT_GETTERS.GET_USER}`,
    }),
  },

  watch: {
    "editor.storage.collaborationCursor.users": function (newValue) {
      this.$emit("updateUsers", newValue);
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
          OrderedList,
          Underline,
          Superscript,
          Subscript,
          Image,
          Table.configure({
            resizable: true,
          }),
          TableRow,
          TableHeader,
          CustomTableCell,
          Collaboration.configure({
            document: ydoc,
          }),
          CollaborationCursor.configure({
            provider: provider,
            user: {
              name,
              color: this.userColor,
            },
          }),
        ],
        content: content,
        editable: this.isEditable,

        onUpdate: () => {
          this.$emit("input", this.editor.getJSON());
        },
        onFocus: () => {
          this.$emit("selectBlock", {
            name,
            id: this.editorData.id,
          });
        },
      });
    } catch (e) {
      console.log(e);
    }
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
.editor-text {
  height: 93%;
  .editor-content {
    height: inherit;
  }
}
</style>
