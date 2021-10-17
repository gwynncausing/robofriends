<template>
  <div>
    <div v-if="editor">
      <button
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <v-icon> mdi-format-bold </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <v-icon> mdi-format-italic </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <v-icon> mdi-format-strikethrough-variant </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <v-icon>mdi-code-tags</v-icon>
      </button>
      <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button> -->
      <button @click="editor.chain().focus().clearNodes().run()">
        <!-- clear nodes -->
        <v-icon>mdi-format-title</v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <v-icon>mdi-format-paragraph</v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <v-icon>mdi-format-header-1</v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <v-icon>mdi-format-header-2</v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <v-icon>mdi-format-header-3</v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <v-icon>mdi-format-list-bulleted</v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <v-icon>mdi-format-list-numbered</v-icon>
      </button>
      <button @click="editor.chain().focus().redo().run()">
        <v-icon>mdi-redo</v-icon>
      </button>
      <button @click="editor.chain().focus().undo().run()">
        <v-icon>mdi-undo</v-icon>
      </button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

// A new Y document
// const ydoc = new Y.Doc();
// Registered with a WebRTC provider
// new WebrtcProvider("bud-test-1", ydoc);

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },

  mounted() {
    const ydoc = new Y.Doc();

    const documentId = "testDocumentIdentifier";

    let content = ``;
    // <h4>Hello Cary Gwapo!</h4>
    //   <p>This is a test text.</p>

    const provider = new WebrtcProvider(documentId, ydoc);

    this.editor = new Editor({
      extensions: [
        StarterKit,
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider: provider,
          user: {
            name: "Test User",
            color: "#58D29F",
          },
        }),
      ],
      content,
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
button {
  border: 1px solid $neutral-700;
  border-radius: 4px;
  padding: 2px;
  margin: 4px;
  background-color: $white;
  transition: background-color 250ms;

  &:hover {
    background-color: $neutral-100;
  }
}
</style>

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
    // border-right: 1px solid #0d0d0d;
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
      left: 0;
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
