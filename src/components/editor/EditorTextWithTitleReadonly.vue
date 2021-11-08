<template>
  <div class="editor-text-with-title">
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

const CustomDocument = Document.extend({
  content: "heading block*",
});
export default {
  name: "EditorTextWithTitle",
  components: {
    EditorContent,
  },
  props: {
    editorData: {
      type: Object,
      default: () => ({}),
    },
    value: {
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
  watch: {
    value: {
      handler(value) {
        this.editor.commands.setContent(value);
      },
    },
  },
  mounted() {
    let content = this.editorData.content;
    try {
      this.editor = new Editor({
        extensions: [
          CustomDocument,
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
          Heading.configure({
            levels: [2],
            HTMLAttributes: {
              id: "research-title",
              class: "pb-4 ",
            },
          }),
        ],
        content: content,
        editable: false,
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
