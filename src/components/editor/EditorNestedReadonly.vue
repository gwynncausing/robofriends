<template>
  <div>
    <div
      v-for="editor in list"
      :id="'editor-' + editor.id"
      :key="editor.id"
      class="editor-panels-wrapper"
    >
      <div class="parent-wrapper">
        <div class="parent">
          <v-btn
            v-if="editor.blockType === 'heading'"
            :id="'toggle-' + editor.id"
            icon
            class="toggle"
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

      <div
        v-show="editor.blockType === 'heading'"
        :id="'children-' + editor.id"
        class="children"
      >
        <EditorNestedReadOnly :list="editor.children" />
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
      let children = document.getElementById("children-" + id);
      let toggle = document.getElementById("toggle-" + id);
      if (children.style.display === "block") {
        children.style.display = "none";
        toggle.classList.remove("down");
      } else {
        children.style.display = "block";
        toggle.classList.add("down");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.draggable-container {
  width: 100%;
  background-color: $neutral-50;
}
.editor-panels-wrapper {
  background-color: white;
}
.parent-wrapper {
  .parent {
    display: flex;
    align-items: top;
    background-color: white;
    padding-bottom: 24px;
    .handle {
      cursor: grab;
      width: 24px;
      margin-bottom: auto;
      margin-top: 8px;
    }
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
}
.children {
  min-height: 200px;
  height: fit-content;
  margin-left: 50px;
  display: none;
}
.down {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.chosen,
.drag {
  background-color: white;
}
.ghost {
  opacity: 50%;
}
</style>
