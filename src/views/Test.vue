<template>
  <div class="test">
    <div class="row">
      <div class="col-8">
        <h3>Nested draggable</h3>
        <NestedExpandableDraggable :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import NestedExpandableDraggable from "@/components/NestedExpandableDraggable";
export default {
  parent: "Test",
  components: {
    NestedExpandableDraggable,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          parent: "task 1",
          children: [],
        },
        {
          id: 2,
          parent: "task 2",
          children: [],
        },
        {
          id: 3,
          parent: "task 3",
          children: [],
        },
        {
          id: 4,
          parent: "task 4",
          children: [],
        },
        {
          id: 5,
          parent: "task 5",
          children: [],
        },
      ],
    };
  },
  watch: {
    list: function () {
      console.log(this.list);
    },
  },
};
</script>

<style lang="scss" scoped></style>
