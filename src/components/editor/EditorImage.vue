<template>
  <div class="editor-image">
    <EditorTextFormatterButtons
      :editor="editor"
      :block-type="editorData.blockType"
      :column="editorData.column"
      @setColumn="$emit('setColumn', $event)"
    />
    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";

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
  content: "heading image",
});

export default {
  name: "EditorImage",
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
          CustomDocument,
          Text,
          Paragraph,
          Image,
          Dropcursor,
          Heading.configure({
            levels: [4],
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

  methods: {
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    testMethod() {
      console.log("test");
    },
  },

  beforeUnmount() {
    this.editor.destroy();
    this.provider.destroy();
  },
};
</script>

<style lang="scss" scoped>
.editor-image {
  height: 93%;
  .editor-content {
    height: inherit;
  }
}
</style>
