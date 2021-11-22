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
      style="display: block"
      class="editor-panels-wrapper"
    >
      <!-- temporary to get content -->
      <!-- {{ cloneList[index] }} -->
      <div class="parent">
        <v-icon class="handle"> mdi-drag-vertical </v-icon>
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
            :provider="provider"
            :y-doc="yDoc"
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

      <div :id="'children-wrapper' + editor.id" class="children-wrapper">
        <div
          v-show="editor.blockType === 'heading'"
          :id="'children-' + editor.id"
          class="children"
        >
          <EditorDraggable :list="editor.children" />
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
      cloneList: [],
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
    onEnd(event) {
      this.$emit("dragElement", event.newIndex, event.oldIndex);
    },
    input(event, index) {
      this.$emit("getContent", { content: event, index: index });
      this.cloneList.length = 0;
      this.list.forEach((item) => {
        /* eslint-disable-next-line*/
        const { ydoc, ...newObject } = item;
        this.cloneList.push(newObject);
      });
      console.log("this.cloneList", this.cloneList);
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
