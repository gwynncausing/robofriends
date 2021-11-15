<template>
  <draggable
    v-bind="dragOptions"
    class="block-list-wrapper"
    :list="list"
    :empty-insert-threshhold="500"
    tag="div"
    handle=".handle"
  >
    <div v-for="el in list" :key="el.parent" class="parent-wrapper">
      <div class="parent">
        <v-icon class="handle"> mdi-drag-vertical </v-icon>
        <v-btn
          :id="'toggle-' + el.id"
          icon
          class="toggle"
          @click="toggleChildren(el.id)"
        >
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
        <span> {{ el.parent }} </span>
      </div>
      <div :id="'children-' + el.id" class="children-wrapper">
        <NestedExpandableDraggable :list="el.children" />
      </div>
    </div>
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
.block-list-wrapper {
  margin: 0;
  background-color: $neutral-50;
}
.parent-wrapper {
  padding: 1rem;
  background-color: white;
  .parent {
    display: flex;
    align-items: center;
    .handle {
      float: left;
      cursor: grab;
    }
  }
}
.child-wrapper {
  min-height: 100px;
  height: fit-content;
  margin-left: 20px;
  display: none;
}
.toggle {
  border-radius: 50%;
  &:hover {
    background-color: $neutral-50;
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
  opacity: 0;
}
</style>
