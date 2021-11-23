<template>
  <div>
    <EditorTextFormatterButtons
      :editor="editor"
      :block-type="editorData.blockType"
    />
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";

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
const CustomDocument = Document.extend({
  content: "heading",
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

    this.editor = new Editor({
      extensions: [
        CustomDocument,
        Text,
        Paragraph,
        Heading.configure({
          levels: [1, 2, 3, 4],
          HTMLAttributes: {
            class: "editor-heading-block-title",
          },
        }),
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return "What’s the title?";
            }

            return "Text in this line will be neglected from exporting. Add an image instead";
          },
        }),
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
  },

  methods: {
    //
  },

  beforeUnmount() {
    this.editor.destroy();
    this.provider.destroy();
  },
};
</script>
