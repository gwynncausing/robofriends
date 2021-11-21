<template>
  <div class="adviser">
    <AppBar
      :routes="routes"
      :notification="notification"
      :user="userInformation"
      :is-account-menu-dropdown-close-on-click="true"
    >
      <template v-slot:account-menu-dropdown>
        <AppBarMenuDropdownAdviser
          @goToAccountSettings="goToAccountSettings"
          @logout="logout"
        />
      </template>
    </AppBar>
    <v-container>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-container>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import AppBarMenuDropdownAdviser from "@/components/adviser/AppBarMenuDropdownAdviser.vue";

import { mapGetters, mapActions } from "vuex";
import { ROOT_GETTERS, ROOT_ACTIONS } from "@/store/types";
import { capitalizeFirstLetter } from "@/utils/helpers";

export default {
  name: "Adviser",
  components: { AppBar, AppBarMenuDropdownAdviser },
  data: function () {
    return {
      user: {
        name: "Teacher",
        profile: "",
        image:
          "https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg",
      },
      routes: [
        // {
        //   name: "Home",
        //   path: { name: "Adviser Dashboard" },
        // },
        {
          name: "Manage Teams",
          path: { name: "Manage Teams" },
        },
        {
          name: "Archive",
          path: { name: "Adviser Archive" },
        },
      ],
      notification: {
        path: { name: "Adviser Invitation" },
      },
    };
  },
  computed: {
    ...mapGetters({
      getUser: ROOT_GETTERS.GET_USER,
    }),
    userInformation() {
      return {
        ...this.user,
        name: capitalizeFirstLetter(this.getUser.lastName || "User"),
      };
    },
  },
  methods: {
    ...mapActions({
      onLogoutUser: ROOT_ACTIONS.LOGOUT_USER,
    }),
    goToAccountSettings() {
      this.$router.push({ name: "Adviser Account Settings" });
    },
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
