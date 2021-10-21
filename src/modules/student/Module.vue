<template>
  <div class="student">
    <AppBar
      :routes="routes"
      :notifications="notifications"
      :user="user"
      @logout="logout"
    />
    <v-container>
      <router-view class="mt-5" />
    </v-container>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

export default {
  name: "Student",
  components: { AppBar },
  data: function () {
    return {
      user: {
        name: "Dodoy",
        profile: "",
        image:
          "https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg",
      },
      routes: [
        {
          name: "Home",
          path: { name: "Dashboard" },
        },
        {
          name: "Research Details",
          path: { name: "Research Details" },
        },
        {
          name: "Research Paper",
          path: { name: "Research Paper Editor" },
        },
        {
          name: "Archive",
          path: { name: "Archive" },
        },
      ],
      notifications: [
        {
          name: "Notification 1",
          details: "",
          path: "",
        },
        {
          name: "Notification 2",
          details: "",
          path: "",
        },
        {
          name: "Notification 3",
          details: "",
          path: "",
        },
      ],
    };
  },
  methods: {
    logout() {
      console.log("Logout User");
    },
  },
};
</script>
