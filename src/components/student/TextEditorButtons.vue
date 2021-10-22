<template>
  <div v-if="editor" class="formatter-wrapper">
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
</template>

<script>
export default {
  name: "TextEditorButtons",
  props: {
    editor: {
      type: Object,
      default: () => ({}),
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
