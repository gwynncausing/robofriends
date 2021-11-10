<template>
  <div v-if="editor" class="formatter-wrapper">
    <div v-if="blockType === 'image'">
      <input
        ref="fileInput"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        hidden
        @change="selectFiles"
      />
      <button @click="addImage">
        <v-icon>mdi-image-plus</v-icon>
      </button>
    </div>

    <div v-else-if="blockType === 'text' || blockType === 'table'">
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
        :class="{ 'is-active': editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <v-icon> mdi-format-underline </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <v-icon> mdi-format-strikethrough-variant </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('subscript') }"
        @click="toggleSubscript()"
      >
        <v-icon> mdi-format-subscript </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('superscript') }"
        @click="toggleSuperscript()"
      >
        <v-icon> mdi-format-superscript </v-icon>
      </button>

      <span class="formatter-section-end"></span>

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

      <span class="formatter-section-end"></span>

      <button @click="editor.chain().focus().redo().run()">
        <v-icon>mdi-redo</v-icon>
      </button>
      <button @click="editor.chain().focus().undo().run()">
        <v-icon>mdi-undo</v-icon>
      </button>
      <button
        @click="
          {
            editor.chain().focus().clearNodes().run(),
              editor.chain().focus().unsetAllMarks().run();
          }
        "
      >
        <v-icon>mdi-cancel</v-icon>
      </button>
    </div>

    <div v-if="blockType === 'table'">
      <button
        @click="
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        "
      >
        insertTable
      </button>
      <button
        :disabled="!editor.can().addColumnBefore()"
        @click="editor.chain().focus().addColumnBefore().run()"
      >
        addColumnBefore
      </button>
      <button
        :disabled="!editor.can().addColumnAfter()"
        @click="editor.chain().focus().addColumnAfter().run()"
      >
        addColumnAfter
      </button>
      <button
        :disabled="!editor.can().deleteColumn()"
        @click="editor.chain().focus().deleteColumn().run()"
      >
        deleteColumn
      </button>
      <button
        :disabled="!editor.can().addRowBefore()"
        @click="editor.chain().focus().addRowBefore().run()"
      >
        addRowBefore
      </button>
      <button
        :disabled="!editor.can().addRowAfter()"
        @click="editor.chain().focus().addRowAfter().run()"
      >
        addRowAfter
      </button>
      <button
        :disabled="!editor.can().deleteRow()"
        @click="editor.chain().focus().deleteRow().run()"
      >
        deleteRow
      </button>
      <button
        :disabled="!editor.can().deleteTable()"
        @click="editor.chain().focus().deleteTable().run()"
      >
        deleteTable
      </button>
      <button
        :disabled="!editor.can().mergeCells()"
        @click="editor.chain().focus().mergeCells().run()"
      >
        mergeCells
      </button>
      <button
        :disabled="!editor.can().splitCell()"
        @click="editor.chain().focus().splitCell().run()"
      >
        splitCell
      </button>
      <button
        :disabled="!editor.can().toggleHeaderColumn()"
        @click="editor.chain().focus().toggleHeaderColumn().run()"
      >
        toggleHeaderColumn
      </button>
      <button
        :disabled="!editor.can().toggleHeaderRow()"
        @click="editor.chain().focus().toggleHeaderRow().run()"
      >
        toggleHeaderRow
      </button>
      <button
        :disabled="!editor.can().toggleHeaderCell()"
        @click="editor.chain().focus().toggleHeaderCell().run()"
      >
        toggleHeaderCell
      </button>
    </div>

    <div v-else-if="blockType === 'text-with-title'">
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
        :class="{ 'is-active': editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <v-icon> mdi-format-underline </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <v-icon> mdi-format-strikethrough-variant </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('subscript') }"
        @click="editor.chain().focus().toggleSubscript().run()"
      >
        <v-icon> mdi-format-subscript </v-icon>
      </button>
      <button
        :class="{ 'is-active': editor.isActive('superscript') }"
        @click="editor.chain().focus().toggleSuperscript().run()"
      >
        <v-icon> mdi-format-superscript </v-icon>
      </button>

      <span class="formatter-section-end"></span>

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

      <span class="formatter-section-end"></span>

      <button @click="editor.chain().focus().redo().run()">
        <v-icon>mdi-redo</v-icon>
      </button>
      <button @click="editor.chain().focus().undo().run()">
        <v-icon>mdi-undo</v-icon>
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        <v-icon>mdi-cancel</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
import HelperFunctions from "@/utils/helper-functions.js";

export default {
  name: "TextEditorButtons",
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
    blockType: {
      type: String,
      default: "",
    },
  },

  methods: {
    toggleSubscript() {
      this.editor.chain().focus().toggleSubscript().run();

      // console.log(this.editor.isActive("superscript"));
      if (this.editor.isActive("superscript")) {
        this.editor.chain().focus().toggleSuperscript().run();
      }
    },
    toggleSuperscript() {
      this.editor.chain().focus().toggleSuperscript().run();
      // console.log(this.editor.isActive("subscript"));

      if (this.editor.isActive("subscript")) {
        this.editor.chain().focus().toggleSubscript().run();
      }
    },
    addImage() {
      const fileInput = this.$refs.fileInput;
      fileInput.click();
    },

    async selectFiles() {
      const files = this.$refs.fileInput.files;
      const filesUrl = await HelperFunctions.uploadImage(files);
      filesUrl.forEach((url) => {
        this.editor.chain().focus().setImage({ src: url }).run();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.formatter-wrapper {
  .formatter-section-end {
    border-right: 1px solid black;
    margin-right: 10px;
    padding-right: 10px;
  }
}
button {
  border-radius: 4px;
  padding: 2px;
  margin: 4px;
  background-color: $white;
  transition: background-color 250ms;

  &:hover {
    background-color: $neutral-100;
  }

  &.is-active {
    background: $neutral-100;
  }
}
</style>
