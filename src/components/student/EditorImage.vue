<template>
  <div>
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
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
import { GETTERS } from "@/store/types/getters";

// A new Y document
// const ydoc = new Y.Doc();
// Registered with a WebRTC provider
// new WebrtcProvider("bud-test-1", ydoc);

const CustomDocument = Document.extend({
  content: "heading block*",
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
              color: this.getRandomColor(),
            },
            onUpdate: (users) => {
              this.users = users;
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
    testMethod() {
      console.log("test");
    },
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror.ProseMirror-focused {
  outline: none;
}

.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}

.ProseMirror {
  min-height: 194px;

  > * + * {
    margin-top: 0.75em;
  }

  p {
    margin: 0;
  }

  .collaboration-cursor__caret {
    position: relative;
    margin-left: -1px;
    margin-right: -1px;
    border-left: 1px solid #0d0d0d;
    border-right: 1px solid #0d0d0d;
    word-break: normal;

    &::before {
      content: " ";
      position: absolute;
      width: 0.4rem;
      height: -webkit-fill-available;
    }

    .collaboration-cursor__label {
      white-space: nowrap;
      position: absolute;
      top: -1.4em;
      left: -1px;
      font-size: 12px;
      font-weight: bold;
      padding: 0.2rem;
      opacity: 0;
      line-height: normal;
    }

    &:hover {
      .collaboration-cursor__label {
        opacity: 1;
      }
    }
  }
}
</style>
