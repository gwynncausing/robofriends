<template>
  <div v-if="editor" class="formatter-wrapper">
    <div v-if="blockType === 'image'">
      <button @click="addImage">
        <v-icon>mdi-image-plus</v-icon>
      </button>
    </div>

    <div v-else-if="blockType === 'text'">
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
      <button
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <v-icon>mdi-code-tags</v-icon>
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
      <button
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <v-icon>mdi-code-tags</v-icon>
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
    addImage() {
      const url = window.prompt("URL");

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
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
