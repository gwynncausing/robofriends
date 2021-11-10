<template>
  <div class="test">
    <div class="row">
      <div class="col-8">
        <h3>Nested draggable</h3>
        <NestedDraggable :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import NestedDraggable from "@/components/NestedDraggable";
export default {
  parent: "Test",
  components: {
    NestedDraggable,
  },
  data() {
    return {
      list: [
        {
          parent: "task 1",
          children: [
            {
              parent: "task 2",
              children: [],
            },
          ],
        },
        {
          parent: "task 3",
          children: [
            {
              parent: "task 4",
              children: [],
            },
          ],
        },
        {
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
