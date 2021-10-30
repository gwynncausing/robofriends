<template>
  <v-list>
    <v-list-item
      class="text-right"
      active="primary"
      @click="goToAccountSettings"
    >
      <v-list-item-content
        class="button-font neutral-600--text d-flex justify-end"
        >Account Settings</v-list-item-content
      >
    </v-list-item>
    <v-list-item class="text-right" @click="logout">
      <v-list-item-content
        class="button-font neutral-600--text d-flex justify-end"
        >Logout</v-list-item-content
      >
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "Student",
  components: {},
  data: function () {
    return {};
  },
  computed: {},
  methods: {
    goToAccountSettings() {
      this.$emit("goToAccountSettings");
    },
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
