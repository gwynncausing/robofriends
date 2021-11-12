<template>
  <!-- <draggable
    v-bind="dragOptions"
    class="item-container"
    :list="list"
    :empty-insert-threshhold="500"
    tag="v-expansion-panels"
    :component-data="componentData"
    handle=".handle"
  >
    <v-expansion-panel v-for="el in list" :key="el.parent" class="item-group">
      <v-expansion-panel-header class="item">
        <v-icon class="handle">mdi-drag-vertical</v-icon>

        <template v-slot:actions>
          <v-icon class="icon">$expand</v-icon>
        </template>
        <span class="header"> {{ el.parent }} </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <NestedExpandableDraggable :list="el.children" class="item-sub" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </draggable> -->
  <draggable
    v-bind="dragOptions"
    class="block-list-wrapper"
    :list="list"
    :empty-insert-threshhold="10"
    tag="div"
    handle=".handle"
  >
    <details v-for="el in list" :key="el.parent" class="parent-wrapper">
      <summary class="parent">
        <v-icon class="handle">mdi-drag-vertical</v-icon>
        <span class="parent"> {{ el.parent }} </span>
      </summary>
      <div class="child-wrapper">
        <NestedExpandableDraggable :list="el.children" class="child" />
      </div>
    </details>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "NestedExpandableDraggable",
  components: {
    draggable,
  },
  props: {
    list: {
      required: false,
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      // componentData: {
      //   attrs: {
      //     accordion: true,
      //     flat: true,
      //     tile: true,
      //   },
      // },
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
  methods: {},
};
</script>
<style lang="scss" scoped>
.block-list-wrapper {
  margin: 0;
}
.parent-wrapper {
  padding: 1rem;
  background-color: white;
  .handle {
    float: left;
    cursor: grab;
  }
  .parent {
    cursor: default;
  }
}

// summary {
//   font-weight: bold;
//   list-style-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/right-arrow.svg);
// }
// summary::-webkit-details-marker {
//   background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/right-arrow.svg);
//   color: transparent;
// }

.child-wrapper {
  height: 100px;
  margin-left: 20px;
}
.chosen,
.drag {
  background-color: white;
}

.ghost {
  background-color: $neutral-50;
}
</style>
