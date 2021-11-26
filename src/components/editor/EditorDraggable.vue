<template>
  <draggable
    v-bind="dragOptions"
    class="draggable-container"
    :list="list"
    tag="div"
    handle=".handle"
    @end="onEnd($event)"
    @start="onStart($event)"
  >
    <div
      v-for="(editor, index) in list"
      :id="'editor-' + editor.id"
      :key="editor.id"
      style="display: block"
      class="editor-panels-wrapper"
    >
      <div class="parent">
        <v-icon v-if="isEditable" class="handle"> mdi-drag-vertical </v-icon>
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
          <EditorText
            :editor-data="editor"
            :user-color="userColor"
            :provider="provider"
            :y-doc="yDoc"
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
            :provider="provider"
            :y-doc="yDoc"
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
            :provider="provider"
            :y-doc="yDoc"
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
            :provider="provider"
            :y-doc="yDoc"
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
          v-else-if="editor.blockType === 'reference'"
          class="editor-content-reference"
        >
          <EditorReference
            :editor-data="editor"
            :user-color="userColor"
            :provider="provider"
            :y-doc="yDoc"
            @input="input($event, index)"
            @updateUsers="$emit('updateUsers', $event)"
            @selectBlock="$emit('selectBlock', $event)"
          />
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
import EditorReference from "@/components/editor/EditorReference.vue";
import draggable from "vuedraggable";
export default {
  name: "EditorDraggable",
  components: {
    draggable,
    EditorText,
    EditorImage,
    EditorHeading,
    EditorTable,
    EditorReference,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    userColor: {
      type: String,
      default: null,
    },
    provider: {
      type: Object,
      default: () => {},
    },
    yDoc: {
      type: Object,
      default: () => {},
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
        childrenCount: 0,
      },
      selectedBlockId: "",
    };
  },

  watch: {
    selectedBlockId(newValue, oldValue) {
      let newBlockRef = "block-" + newValue;
      let oldBlockRef = "block-" + oldValue;
      this.$refs?.[oldBlockRef]?.[0]?.classList.remove("focused");
      this.$refs?.[newBlockRef]?.[0]?.classList.add("focused");
    },
  },
  methods: {
    onStart(event) {
      this.childrenCount = 0;
      const parentIndex = event.oldIndex;
      const parentBlock = this.list[parentIndex];
      if (
        parentIndex !== this.list.length - 1 &&
        parentBlock.blockType === "heading"
      ) {
        document
          .getElementById("toggle-" + parentBlock.id)
          .classList.remove("down");
        for (let i = parentIndex + 1; i < this.list.length; i++) {
          const block = this.list[i];
          if (
            block.blockType === "heading" &&
            parentBlock.content[0].attrs.level >= block.content[0].attrs.level
          ) {
            break;
          } else {
            const element = document.getElementById("editor-" + block.id);
            element.style.display = "none";
            this.childrenCount++;
          }
        }
      }
    },
    onEnd(event) {
      this.$emit(
        "dragElement",
        event.newIndex,
        event.oldIndex,
        this.childrenCount
      );
    },
    input(event, index) {
      this.$emit("getContent", { content: event, index: index });
    },
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
  .editor-content-image,
  .editor-content-reference {
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
