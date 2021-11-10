<template>
  <div class="editor-toolbar" :style="{ top: currentToolbarPosition + 'px' }">
    <Button icon @click="addEditor(currentSelectedEditorIndex)">
      <v-icon class="editor-control-icon">mdi-plus-circle-outline</v-icon>
    </Button>

    <Button icon @click="addEditor(currentSelectedEditorIndex, 'image')">
      <v-icon class="editor-control-icon">mdi-image-outline</v-icon>
    </Button>

    <Button icon @click="addEditor(currentSelectedEditorIndex, 'heading')">
      <v-icon class="editor-control-icon">mdi-application-outline</v-icon>
    </Button>

    <Button icon @click="addEditor(currentSelectedEditorIndex, 'table')">
      <v-icon class="editor-control-icon">mdi-table</v-icon>
    </Button>

    <Button icon @click="testMethod">
      <v-icon class="editor-control-icon">mdi-comment-text-outline</v-icon>
    </Button>

    <Button icon @click="removeEditor(currentSelectedEditorIndex)">
      <v-icon class="editor-control-icon">mdi-delete</v-icon>
    </Button>
  </div>
</template>

<script>
export default {
  name: "EditorToolbar",
  props: {
    currentToolbarPosition: {
      type: Number,
      default: 0,
    },
    currentSelectedEditorIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    addEditor(currentSelectedEditorIndex, blockType = "text") {
      this.$emit("addEditor", { currentSelectedEditorIndex, blockType });
    },
    removeEditor(currentSelectedEditorIndex) {
      this.$emit("removeEditor", { currentSelectedEditorIndex });
    },
    testMethod() {
      console.log("testMethod called");
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-toolbar {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid $neutral-400;
  border-radius: 4px;
  padding: 0.5rem;
  height: 288px;
  transition: all 0.5s;

  button {
    width: 40px;

    .editor-control-icon {
      color: $neutral-700;
    }

    &:last-child {
      margin-top: auto;

      .editor-control-icon {
        color: $red;
      }
    }
  }
}
</style>
