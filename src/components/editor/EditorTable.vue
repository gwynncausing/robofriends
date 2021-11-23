<template>
  <div class="editor-table">
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
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
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
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

import EditorTextFormatterButtons from "./EditorTextFormatterButtons";

import { mapGetters } from "vuex";
import { ROOT_GETTERS } from "@/store/types";

const CustomDocument = Document.extend({
  content: "heading table*",
});

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
    "editor.storage.collaborationCursor.users": function (newValue) {
      this.$emit("updateUsers", newValue);
    },
  },

  mounted() {
    const name = `${this.getUser.firstName} ${this.getUser.lastName}`;
    try {
      this.editor = new Editor({
        extensions: [
          CustomDocument,
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
          Dropcursor,
          Link.configure({
            openOnClick: true,
          }),
          Heading.configure({
            levels: [2],
          }),
          Placeholder.configure({
            placeholder: ({ node }) => {
              if (node.type.name === "heading") {
                return "What’s the label?";
              }

              return "Text in this line will be neglected from exporting. Add a table instead";
            },
          }),
          TextAlign.configure({
            types: ["paragraph"],
          }),
          Table.configure({
            resizable: true,
          }),
          TableRow,
          TableHeader,
          CustomTableCell,
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
    this.provider.destroy();
  },
};
</script>

<style lang="scss" scoped>
.editor-table {
  height: 93%;
  .editor-content {
    height: inherit;
  }
}
</style>
