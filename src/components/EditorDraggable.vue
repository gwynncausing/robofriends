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
      :aria-expanded="expanded"
    >
      <v-expansion-panel-header>
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
              @input="$emit('getContent', $event, index)"
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
              @input="$emit('getContent', $event, index)"
              @updateUsers="$emit('updateUsers', $event)"
              @selectBlock="$emit('selectBlock', $event)"
            />
          </div>
          <div
            v-else-if="editor.blockType === 'section'"
            class="editor-content-section"
          >
            <EditorSection
              :editor-data="editor"
              :user-color="userColor"
              @input="$emit('getContent', $event, index)"
              @updateUsers="$emit('updateUsers', $event)"
              @selectBlock="$emit('selectBlock', $event)"
            />
          </div>
        </div>
      </v-expansion-panel-header>

      <v-expansion-panel-content :class="collapsed">
        <EditorDraggable :list="editor.children" class="item-sub" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </draggable>
</template>
<script>
import EditorText from "@/components/editor/EditorText.vue";
import EditorImage from "@/components/editor/EditorImage.vue";
import EditorSection from "@/components/editor/EditorSection.vue";
import draggable from "vuedraggable";
export default {
  name: "EditorDraggable",
  components: {
    draggable,
    EditorText,
    EditorImage,
    EditorSection,
  },
  props: {
    list: {
      required: true,
      type: Array,
    },
    userColor: {
      required: false,
      type: String,
      default: null,
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
    list: function () {
      console.log(this.list);
    },
  },
  methods: {
    onEnd(event) {
      console.log(event.oldIndex);
      this.$emit("dragElement");
    },
    // onClick(event) {
    //   if (event.target.classList.contains("toggleButton")) {
    //     this.isExpanded = "";
    //   } else {
    //     this.expanded = false;
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
// .collapsed {
//   display: none;
// }

.v-expansion-panels {
  margin: 0;
  width: 100%;
  background-color: $neutral-50;
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
    width: 100%;
    border: 1px solid $neutral-400;
    border-radius: 4px;
    padding: 0.8rem;
  }
  .editor-content-section,
  .editor-content-text,
  .editor-content-image {
    cursor: text;
  }

  .editor-content-section {
    height: 42px;
    padding: 4px;
  }

  // .editor-content-text {
  //   min-height: 18rem; // 304px
  // }
}

.v-expansion-panel-content {
  height: 50px;
}
.chosen,
.drag {
  background-color: white;
}

.ghost {
  background-color: $neutral-50;
}
</style>
