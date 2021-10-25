<template>
  <div class="adviser">
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

import { mapGetters, mapActions } from "vuex";
import { ROOT_GETTERS } from "@/store/types/getters";
import { ROOT_ACTIONS } from "@/store/types/actions";
import HelperFunctions from "@/utils/helper-functions";

export default {
  name: "Adviser",
  components: { AppBar },
  data: function () {
    return {
      user: {
        name: "Teacher",
        profile: "",
        image:
          "https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg",
      },
      routes: [
        {
          name: "Home",
          path: { name: "Home" },
        },
        {
          name: "Manage Teams",
          path: { name: "Manage Teams" },
        },
        // {
        //   name: "Archive",
        //   path: { name: "Archive" },
        // },
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
  computed: {
    ...mapGetters({
      getUser: ROOT_GETTERS.GET_USER,
    }),
    userInformation() {
      return {
        ...this.user,
        name: HelperFunctions.capitalizeFirstLetter(
          this.getUser.lastName || "User"
        ),
      };
    },
  },
  methods: {
    ...mapActions({
      onLogoutUser: ROOT_ACTIONS.LOGOUT_USER,
    }),
    async logout() {
      try {
        await this.onLogoutUser();
        this.$router.replace({ name: "SignIn" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
