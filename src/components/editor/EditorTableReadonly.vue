<template>
  <div class="editor-table">
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
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";

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
  name: "EditorTableReadonly",
  components: {
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

  mounted() {
    let content = this.editorData.content;

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
          Link.configure({
            openOnClick: true,
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
        ],
        editable: false,
      });
    } catch (e) {
      console.log(e);
    }
    this.editor.commands.forEach(content, (item, { commands }) => {
      return commands.insertContent(item);
    });
  },

  beforeUnmount() {
    this.editor.destroy();
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
