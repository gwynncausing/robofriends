<template>
  <div>
    <TextEditorButtons :editor="editor" />
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import { adjectives, animals } from "@/utils/names.js";
import TextEditorButtons from "./TextEditorButtons";

// A new Y document
// const ydoc = new Y.Doc();
// Registered with a WebRTC provider
// new WebrtcProvider("bud-test-1", ydoc);

export default {
  components: {
    TextEditorButtons,
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
    };
  },

  computed: {
    friendlyName: function () {
      return `${this.getRandomAdjective()} ${this.getRandomName()}`;
    },
  },

  watch: {
    content: function (val) {
      console.log(val);
    },
  },

  mounted() {
    const ydoc = new Y.Doc();

    const documentId = "testDocumentIdentifier";
    // const documentId = this.editorData.id;

    // let content = this.editorData.content;

    const provider = new WebrtcProvider(documentId, ydoc);

    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        Superscript,
        Subscript,
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider: provider,
          user: {
            name: this.friendlyName,
            color: this.getRandomColor(),
          },
        }),
      ],
      content: this.content,
    });

    setInterval(() => {
      this.$emit("input", this.editor.getJSON());
    }, 2000);
  },

  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getRandomName() {
      let name = animals[Math.floor(Math.random() * animals.length)];
      name = name.split(" ").map(this.capitalize).join(" ");
      return name;
    },
    getRandomAdjective() {
      let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      adjective = adjective.split(" ").map(this.capitalize).join(" ");
      return adjective;
    },
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

<style lang="scss">
/* Basic editor styles */
.ProseMirror.ProseMirror-focused {
  outline: none;
}
.ProseMirror {
  min-height: 194px;

  > * + * {
    margin-top: 0.75em;
  }

  p {
    margin: 0;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 26.4px;
  }
  h3 {
    font-size: 18.72px;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
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
