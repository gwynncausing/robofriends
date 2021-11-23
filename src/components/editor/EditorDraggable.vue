<template>
  <draggable
    v-bind="dragOptions"
    class="draggable-container"
    :list="list"
    tag="div"
    handle=".handle"
    @end="onEnd($event)"
  >
    <div
      v-for="(editor, index) in list"
      :id="'editor-' + editor.id"
      :key="editor.id"
      class="editor-panels-wrapper"
    >
      <div class="parent">
        <v-icon v-if="isEditable" class="handle"> mdi-drag-vertical </v-icon>
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
          <EditorText
            :editor-data="editor"
            :user-color="userColor"
            :is-editable="isEditable"
            @input="input($event, index)"
            @updateUsers="$emit('updateUsers', $event)"
            @selectBlock="$emit('selectBlock', $event)"
          />
        </div>
        <div
          v-else-if="editor.blockType === 'image'"
          class="editor-content-image"
        >
          <EditorImage
            :editor-data="editor"
            :user-color="userColor"
            :is-editable="isEditable"
            :column="editor.column"
            @setColumn="
              $emit('setColumn', {
                column: $event,
                editor: editor,
              })
            "
            @input="input($event, index)"
            @updateUsers="$emit('updateUsers', $event)"
            @selectBlock="$emit('selectBlock', $event)"
          />
        </div>

        <div
          v-else-if="editor.blockType === 'heading'"
          class="editor-content-heading"
        >
          <EditorHeading
            :editor-data="editor"
            :user-color="userColor"
            :is-editable="isEditable"
            @input="input($event, index)"
            @updateUsers="$emit('updateUsers', $event)"
            @selectBlock="$emit('selectBlock', $event)"
          />
        </div>
        <div
          v-else-if="editor.blockType === 'table'"
          class="editor-content-table"
        >
          <EditorTable
            :editor-data="editor"
            :user-color="userColor"
            :is-editable="isEditable"
            :column="editor.column"
            @setColumn="
              $emit('setColumn', {
                column: $event,
                editor: editor,
              })
            "
            @input="input($event, index)"
            @updateUsers="$emit('updateUsers', $event)"
            @selectBlock="$emit('selectBlock', $event)"
          />
        </div>
      </div>

      <div :id="'children-wrapper' + editor.id" class="children-wrapper">
        <div
          v-show="editor.blockType === 'heading'"
          :id="'children-' + editor.id"
          class="children"
        >
          <EditorDraggable :list="editor.children" :is-editable="isEditable" />
        </div>
      </div>
    </div>
  </draggable>
</template>
<script>
import EditorText from "@/components/editor/EditorText.vue";
import EditorImage from "@/components/editor/EditorImage.vue";
import EditorHeading from "@/components/editor/EditorHeading.vue";
import EditorTable from "@/components/editor/EditorTable.vue";
import draggable from "vuedraggable";
export default {
  name: "EditorDraggable",
  components: {
    draggable,
    EditorText,
    EditorImage,
    EditorHeading,
    EditorTable,
  },
  props: {
    list: {
      required: true,
      type: Array,
      default: () => [],
    },
    userColor: {
      required: false,
      type: String,
      default: null,
    },
    isEditable: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: "editors",
        ghostClass: "ghost",
        chosenClass: "chosen",
        dragClass: "drag",
        emptyInsertThreshold: 5,
      },
      id: 123,
    };
  },
  watch: {
    list: function () {
      console.log(this.list);
    },
  },
  methods: {
    onEnd(event) {
      console.log(event.oldIndex);
      this.$emit("dragElement");
    },
    input(event, index) {
      this.$emit("getContent", { content: event, index: index });
    },
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

.parent {
  display: flex;
  align-items: top;
  padding-bottom: 12px;
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
.children-wrapper {
  margin-left: 60px;
  padding-bottom: 12px;
  .children {
    min-height: 200px;
    height: fit-content;
    display: none;
    border: 1px dashed $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
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
