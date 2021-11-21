<template>
  <div v-if="editor" class="formatter-wrapper">
    <span v-if="blockType === 'image'">
      <input
        ref="fileInput"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        hidden
        @change="selectFiles"
      />
      <button title="Add Image" @click="addImage">
        <v-icon>mdi-image-plus</v-icon>
      </button>
    </span>

    <span
      v-else-if="
        blockType === 'text' ||
        blockType === 'table' ||
        blockType === 'text-with-title'
      "
    >
      <button
        title="Bold"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <v-icon> mdi-format-bold </v-icon>
      </button>
      <button
        title="Italic"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <v-icon> mdi-format-italic </v-icon>
      </button>
      <button
        title="Underline"
        :class="{ 'is-active': editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <v-icon> mdi-format-underline </v-icon>
      </button>
      <button
        title="Strikethrough"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <v-icon> mdi-format-strikethrough-variant </v-icon>
      </button>
      <button
        title="Subscript"
        :class="{ 'is-active': editor.isActive('subscript') }"
        @click="toggleSubscript()"
      >
        <v-icon> mdi-format-subscript </v-icon>
      </button>
      <button
        title="Superscript"
        :class="{ 'is-active': editor.isActive('superscript') }"
        @click="toggleSuperscript()"
      >
        <v-icon> mdi-format-superscript </v-icon>
      </button>

      <span class="formatter-section-end"></span>

      <button
        title="Bullet List"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <v-icon>mdi-format-list-bulleted</v-icon>
      </button>
      <button
        title="Number List"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <v-icon>mdi-format-list-numbered</v-icon>
      </button>
    </span>
    <span v-if="blockType === 'table'">
      <span class="formatter-section-end"></span>

      <button
        title="Align Left"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        @click="editor.chain().focus().setTextAlign('left').run()"
      >
        <v-icon>mdi-format-align-left</v-icon>
      </button>
      <button
        title="Align Center"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        @click="editor.chain().focus().setTextAlign('center').run()"
      >
        <v-icon>mdi-format-align-center</v-icon>
      </button>
      <button
        title="Align Right"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        @click="editor.chain().focus().setTextAlign('right').run()"
      >
        <v-icon>mdi-format-align-right</v-icon>
      </button>
      <button
        title="Justify"
        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        @click="editor.chain().focus().setTextAlign('justify').run()"
      >
        <v-icon>mdi-format-align-justify</v-icon>
      </button>

      <!-- <span class="formatter-section-end"></span>

      <button
        title="Add Table"
        @click="
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
            .run()
        "
      >
        <v-icon>mdi-table-plus</v-icon>
      </button>

      <button
        title="Remove Table"
        @click="editor.chain().focus().deleteTable().run()"
      >
        <v-icon>mdi-table-remove</v-icon>
      </button> -->

      <span class="formatter-section-end"></span>

      <button
        title="Merge Cells"
        :disabled="!editor.can().mergeCells()"
        @click="editor.chain().focus().mergeCells().run()"
      >
        <v-icon>mdi-table-merge-cells</v-icon>
      </button>
      <button
        title="Split Cells"
        :disabled="!editor.can().splitCell()"
        @click="editor.chain().focus().splitCell().run()"
      >
        <v-icon>mdi-table-split-cell</v-icon>
      </button>

      <span class="formatter-section-end"></span>

      <button
        title="Add Row Before"
        :disabled="!editor.can().addRowBefore()"
        @click="editor.chain().focus().addRowBefore().run()"
      >
        <v-icon>mdi-table-row-plus-before</v-icon>
      </button>
      <button
        title="Add Row After"
        :disabled="!editor.can().addRowAfter()"
        @click="editor.chain().focus().addRowAfter().run()"
      >
        <v-icon>mdi-table-row-plus-after</v-icon>
      </button>
      <button
        title="Remove Row"
        :disabled="!editor.can().deleteRow()"
        @click="editor.chain().focus().deleteRow().run()"
      >
        <v-icon>mdi-table-row-remove</v-icon>
      </button>

      <span class="formatter-section-end"></span>

      <button
        title="Add Column Before"
        :disabled="!editor.can().addColumnBefore()"
        @click="editor.chain().focus().addColumnBefore().run()"
      >
        <v-icon>mdi-table-column-plus-before</v-icon>
      </button>
      <button
        title="Add Column After"
        :disabled="!editor.can().addColumnAfter()"
        @click="editor.chain().focus().addColumnAfter().run()"
      >
        <v-icon>mdi-table-column-plus-after</v-icon>
      </button>
      <button
        title="Remove Column"
        :disabled="!editor.can().deleteColumn()"
        @click="editor.chain().focus().deleteColumn().run()"
      >
        <v-icon>mdi-table-column-remove</v-icon>
      </button>
    </span>

    <span v-if="blockType === 'table' || blockType === 'image'">
      <span class="formatter-section-end"></span>

      <button
        v-if="column === 'singleColumnContent'"
        title="Set to default"
        @click="setColumn('default')"
      >
        <v-icon>mdi-numeric-1-box</v-icon>
      </button>
      <button
        v-else-if="column === 'default'"
        title="Set to single column"
        @click="setColumn('singleColumnContent')"
      >
        <v-icon>mdi-numeric-2-box</v-icon>
      </button>
    </span>

    <span v-if="blockType === 'heading'">
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
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        <v-icon>mdi-format-header-4</v-icon>
      </button>
    </span>

    <span
      v-if="
        blockType === 'text' ||
        blockType === 'table' ||
        blockType === 'heading' ||
        blockType === 'text-with-title'
      "
    >
      <span class="formatter-section-end"></span>

      <button title="Redo" @click="editor.chain().focus().redo().run()">
        <v-icon>mdi-redo</v-icon>
      </button>
      <button title="Undo" @click="editor.chain().focus().undo().run()">
        <v-icon>mdi-undo</v-icon>
      </button>
      <button
        title="Clear Formatting"
        @click="
          {
            editor.chain().focus().clearNodes().run(),
              editor.chain().focus().unsetAllMarks().run();
          }
        "
      >
        <v-icon>mdi-cancel</v-icon>
      </button>
    </span>
  </div>
</template>

<script>
import { uploadFile } from "@/utils/helpers";

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
    column: {
      type: String,
      default: "default",
    },
  },

  methods: {
    setColumn(column) {
      this.$emit("setColumn", column);
    },
    toggleSubscript() {
      this.editor.chain().focus().toggleSubscript().run();
      if (this.editor.isActive("superscript")) {
        this.editor.chain().focus().toggleSuperscript().run();
      }
    },
    toggleSuperscript() {
      this.editor.chain().focus().toggleSuperscript().run();
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
      const filesUrl = await uploadFile(files);
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
