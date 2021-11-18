<template>
  <div class="editor-image">
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

const CustomDocument = Document.extend({
  content: "heading image",
});

export default {
  name: "EditorImageReadonly",
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
          CustomDocument,
          Text,
          Paragraph,
          Image,
          // Dropcursor,
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

  methods: {
    // ,
  },

  beforeUnmount() {
    this.editor.destroy();
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
