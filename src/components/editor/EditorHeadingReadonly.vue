<template>
  <div>
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

const CustomDocument = Document.extend({
  content: "heading",
});

export default {
  name: "EditorHeadingReadonly",
  components: {
    EditorContent,
  },

  props: {
    editorData: {
      required: true,
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      editor: null,
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
        ],
        // content: content,
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
    //
  },

  beforeUnmount() {
    this.editor.destroy();
    // this.provider.destroy();
  },
};
</script>
