<template>
  <div class="editor-text-with-title">
    <EditorTextFormatterButtons
      v-show="isEditable"
      :editor="editor"
      block-type="text-with-title"
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
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

import EditorTextFormatterButtons from "@/components/editor/EditorTextFormatterButtons";

import { mapGetters } from "vuex";
import { ROOT_GETTERS } from "@/store/types";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default {
  name: "EditorTextWithTitle",
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
      type: Boolean,
      default: false,
    },
    provider: {
      required: true,
      type: Object,
      default: null,
    },
    yDoc: {
      type: Object,
      default: () => {},
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
    isEditable: {
      handler(value) {
        this.editor.setOptions({ editable: value });
      },
    },
    "editor.storage.collaborationCursor.users": function (newValue) {
      this.$emit("updateUsers", newValue);
    },
  },

  mounted() {
    const name = `${this.getUser.firstName}${this.getUser.lastName}`;
    try {
      this.editor = new Editor({
        extensions: [
          CustomDocument,
          // Document,
          Paragraph.configure({
            HTMLAttributes: {
              class: "text-justify",
            },
          }),
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
          Link.configure({
            openOnClick: true,
          }),
          Placeholder.configure({
            placeholder: ({ node }) => {
              if (node.type.name === "heading") {
                return "What’s the title?";
              }

              return "Can you add some further context?";
            },
          }),
          Heading.configure({
            levels: [2],
            HTMLAttributes: {
              id: "research-title",
              class: "pb-4 ",
            },
          }),
          Collaboration.configure({
            document: this.yDoc,
            field: this.editorData.id,
          }),
          CollaborationCursor.configure({
            provider: this.provider,
            user: {
              name,
              color: this.userColor,
            },
          }),
        ],
        autofocus: true,
        editable: this.isEditable,
        onUpdate: () => {
          this.$emit("input", this.editor.getJSON());
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
  beforeUnmount() {
    this.editor.destroy();
    this.provider.destroy();
  },
};
</script>

<style lang="scss" scoped>
.editor-text-with-title {
  .editor-content {
    height: inherit;
  }
}
</style>
