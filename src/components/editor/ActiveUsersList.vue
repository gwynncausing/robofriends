<template>
  <div class="editor-profile-list">
    <div
      v-for="user in users"
      :key="user.id"
      class="profile"
      :style="{ backgroundColor: user.color }"
    >
      <!--  -->
      <v-avatar size="38">
        {{ user.name.split(" ")[0][0] }}{{ user.name.split(" ")[1][0] }}
      </v-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActiveUsersList",
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-profile-list {
  width: 52px;
  display: flex;
  gap: 10px;
  flex-direction: row-reverse;

  .profile {
    width: 38px;
    height: 38px;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
}
</style>
