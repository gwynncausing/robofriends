<template>
  <div class="editor-profile-list">
    <div
      v-for="user in newUsers"
      :key="user.id"
      class="profile"
      :style="{ backgroundColor: user.color }"
    >
      <!--  -->
      <v-avatar size="38">{{ getUserInitials(user) }}</v-avatar>
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
  computed: {
    newUsers() {
      let users = [];
      this.users.forEach((user) => {
        if (user.name) {
          users.push(user);
        }
      });
      return users;
    },
  },
  methods: {
    getUserInitials(user) {
      const first = user?.name?.split(" ")[0][0];
      const second = user?.name?.split(" ")[1]?.[0] || "";
      return first + second;
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
