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
      componentData: {
        attrs: {
          accordion: true,
          flat: true,
          tile: true,
        },
      },
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
  methods: {},
};
</script>
<style lang="scss" scoped>
.handle {
  float: left;
  cursor: grab;
}
.item-container {
  max-width: 20rem;
  margin: 0;
}
.item {
  padding: 1rem;
  .icon {
    order: 0;
  }

  .header {
    order: 1;
  }
}
.item-sub {
  margin: 0;
}

.sortable-chosen {
  background-color: $neutral-50;
}
.v-expansion-panels {
  background-color: $neutral-50;
}
.ghost {
  background-color: $neutral-50;
  opacity: 0%;
}
</style>
