<template>
  <div class="editor-nested">
    <div
      v-for="editor in list"
      :id="'editor-' + editor.id"
      :key="editor.id"
      style="display: block"
      class="editor-panels-wrapper"
    >
      <div class="parent">
        <v-btn
          v-if="editor.blockType === 'heading'"
          :id="'toggle-' + editor.id"
          icon
          class="toggle down"
          @click="toggleChildren(editor.id)"
        >
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
        <div v-if="editor.blockType === 'text'" class="editor-content-text">
          <EditorTextReadonly :editor-data="editor" />
        </div>
        <div
          v-else-if="editor.blockType === 'image'"
          class="editor-content-image"
        >
          <EditorImageReadonly :editor-data="editor" />
        </div>

        <div
          v-else-if="editor.blockType === 'heading'"
          class="editor-content-heading"
        >
          <EditorHeadingReadonly :editor-data="editor" />
        </div>
        <div
          v-else-if="editor.blockType === 'table'"
          class="editor-content-table"
        >
          <EditorTableReadonly :editor-data="editor" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditorTextReadonly from "@/components/editor/EditorTextReadonly.vue";
import EditorImageReadonly from "@/components/editor/EditorImageReadonly.vue";
import EditorHeadingReadonly from "@/components/editor/EditorHeadingReadonly.vue";
import EditorTableReadonly from "@/components/editor/EditorTableReadonly.vue";
export default {
  name: "EditorNestedReadOnly",
  components: {
    EditorTextReadonly,
    EditorImageReadonly,
    EditorHeadingReadonly,
    EditorTableReadonly,
  },
  props: {
    list: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      //
    };
  },
  methods: {
    toggleChildren(id) {
      const parentIndex = this.list.findIndex((block) => block.id === id);
      const toggleElement = document.getElementById("toggle-" + id);
      toggleElement.classList.toggle("down");
      const parentBlock = this.list[parentIndex];
      if (parentIndex === this.list.length - 1) return;
      for (let i = parentIndex + 1; i < this.list.length; i++) {
        const block = this.list[i];
        if (
          block.blockType === "heading" &&
          parentBlock.content[0].attrs.level >= block.content[0].attrs.level
        ) {
          break;
        } else {
          const element = document.getElementById("editor-" + block.id);
          if (!toggleElement.classList.contains("down")) {
            element.style.display = "none";
          } else {
            element.style.display = "block";
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.editor-nested {
  width: 100%;
}
.editor-panels-wrapper {
  background-color: white;
}

.parent {
  display: flex;
  align-items: top;
  background-color: white;
  padding-bottom: 24px;
  width: 100%;
  .toggle {
    &:hover {
      background-color: $neutral-50;
    }
  }
  div[class^="editor-content-"] {
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
    cursor: text;
    width: 100%;
  }

  .editor-content-table,
  .editor-content-text,
  .editor-content-image {
    margin-left: 36px;
  }
}

.down {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
