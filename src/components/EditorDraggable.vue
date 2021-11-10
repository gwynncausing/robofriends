<template>
  <draggable
    v-bind="dragOptions"
    class="item-container"
    :list="list"
    :empty-insert-threshhold="500"
    tag="v-expansion-panels"
    :component-data="componentData"
    handle=".handle"
  >
    <v-expansion-panel
      v-for="(editor, index) in list"
      :id="'editor-' + editor.id"
      :key="editor.id"
    >
      <v-expansion-panel-header>
        <v-icon class="handle">mdi-drag-vertical</v-icon>
        <template v-slot:actions>
          <v-icon class="icon">$expand</v-icon>
        </template>
        <div
          v-if="editor.blockType === 'text'"
          class="editor-content-text header"
        >
          <EditorText
            :editor-data="editor"
            :user-color="userColor"
            @input="getContent($event, index)"
            @selectBlock="selectBlock($event)"
          />
        </div>
        <div
          v-else-if="editor.blockType === 'image'"
          class="editor-content-image header"
        >
          <EditorImage
            :editor-data="editor"
            :user-color="userColor"
            @input="getContent($event, index)"
            @selectBlock="selectBlock($event)"
          />
        </div>
        <div
          v-else-if="editor.blockType === 'section'"
          class="editor-content-section header"
        >
          <EditorSection
            :editor-data="editor"
            :user-color="userColor"
            @input="getContent($event, index)"
            @selectBlock="selectBlock($event)"
          />
        </div>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
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
        ghostClass: "ghost",
      };
    },
  },
  watch: {
    list: function () {
      console.log(this.list);
    },
  },
  methods: {
    selectBlock(object) {
      const index = this.list.map((editor) => editor.id).indexOf(object.id);
      this.moveToolbar(object.id, index);
      this.currentSelectedEditorIndex = index;
    },
    moveToolbar(id, index) {
      const editorID = "editor-" + id;
      let position = 0;

      for (let i = 0; i < this.list.length; i++) {
        let editorID = "editor-" + this.list[i].id;
        position += document.getElementById(editorID).clientHeight;
        if (i === index) break;
        position += 24;
      }

      const blockHeight = document.getElementById(editorID).clientHeight;
      this.currentToolbarPosition = position - blockHeight;
    },
    getContent(event, index) {
      this.list[index].content = event.content;
    },
  },
};
</script>
<style lang="scss" scoped>
.handle {
  cursor: grab;
}
.v-expansion-panels {
  margin: 0;
  width: 100%;
  background-color: $neutral-50;
}
.item-sub {
  margin: 0 0 0 1rem;
}

.v-expansion-panel-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  .icon {
    order: 0;
  }
  .header {
    order: 1;
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
.sortable-chosen {
  background-color: $neutral-50;
}
.ghost {
  background-color: $neutral-50;
  opacity: 0%;
}
</style>
