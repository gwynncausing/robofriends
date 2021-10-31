<template>
  <div v-ripple="{ center: true }" class="custom-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    team: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.custom-card {
  user-select: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }

  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.active {
  background-color: $neutral-50;
}
</style>
