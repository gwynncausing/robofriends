<template>
  <draggable
    v-bind="dragOptions"
    class="item-container"
    :list="list"
    :empty-insert-threshhold="500"
    tag="v-expansion-panels"
    :component-data="componentData"
    handle=".handle"
    @end="onEnd($event)"
  >
    <v-expansion-panel
      v-for="(editor, index) in list"
      :id="'editor-' + editor.id"
      :key="editor.id"
    >
      <!-- {{ editor.content }} -->
      <v-expansion-panel-header :hide-actions="editor.blockType !== 'heading'">
        <v-icon class="handle">mdi-drag-vertical</v-icon>
        <template v-slot:actions>
          <v-btn icon>
            <v-icon class="toggleButton">$expand</v-icon>
          </v-btn>
        </template>
        <div class="header">
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
          <!-- @input="$emit('getContent', $event, index)" -->

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
        </div>
      </v-expansion-panel-header>

      <v-expansion-panel-content
        v-if="editor.blockType === 'heading'"
        :class="collapsed"
      >
        <EditorDraggable :list="editor.children" class="item-sub" />
      </v-expansion-panel-content>
    </v-expansion-panel>
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
      componentData: {
        attrs: {
          accordion: true,
          flat: true,
          tile: true,
        },
      },
      id: 123,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost", // Class name for the drop placeholder
        chosenClass: "chosen", // Class name for the chosen item
        dragClass: "drag", // Class name for the dragging item
      };
    },
  },
  watch: {
    // list: function () {
    //   console.log(this.list);
    // },
    selectedBlockId(newValue, oldValue) {
      console.log("newValue: ", newValue, "oldValue: ", oldValue);
      let newBlockRef = "block-" + newValue;
      let oldBlockRef = "block-" + oldValue;
      // console.log("ref: ", this.$refs);
      // console.log("newBlockRef: ", this.$refs[newBlockRef]);
      // console.log("oldBlockRef: ", this.$refs[oldBlockRef]);
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
    },
  },
};
</script>
<style lang="scss" scoped>
.v-expansion-panels {
  width: 100%;
  background-color: $neutral-50;
}

.v-expansion-panel {
  padding-bottom: 24px;
}

.v-expansion-panel-header {
  padding: 0;
  .handle {
    cursor: grab;
    width: 24px;
  }
  .icon {
    order: 0;
  }
  .header {
    order: 1;
    width: 100%;
  }
  div[class^="editor-content-"] {
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
  .editor-content-heading,
  .editor-content-text,
  .editor-content-image,
  .editor-content-table {
    cursor: text;
  }
  .editor-content-text,
  .editor-content-image,
  .editor-content-table {
    margin-left: 36px;
  }

  .editor-content-heading {
    height: 98px;
    padding: 4px;
  }
}
.v-expansion-panel-content {
  min-height: 24px;
}
.chosen,
.drag {
  background-color: white;
}
.ghost {
  opacity: 0;
}
</style>
