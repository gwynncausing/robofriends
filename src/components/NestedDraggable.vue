<template>
  <draggable
    v-bind="dragOptions"
    class="item-container"
    :list="list"
    :value="value"
    :empty-insert-threshhold="500"
    tag="v-expansion-panels"
    :component-data="componentData"
    @input="emitter"
  >
    <v-expansion-panel
      v-for="el in realValue"
      :key="el.parent"
      class="item-group"
    >
      <v-expansion-panel-header class="item">
        <template v-slot:actions>
          <v-icon class="icon">$expand</v-icon>
        </template>
        <span class="header"> {{ el.parent }} </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <NestedDraggable :list="el.children" class="item-sub" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "NestedDraggable",
  components: {
    draggable,
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
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
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    },
  },
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
  },
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
  border: solid black 1px;
  .icon {
    order: 0;
  }

  .header {
    order: 1;
  }
}
.item-sub {
  margin: 0 0 0 1rem;
}
.sortable-chosen {
  background-color: $neutral-50;
}
.ghost {
  background-color: $neutral-50 !important;
  opacity: 0%;
}
</style>
