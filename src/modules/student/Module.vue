<template>
  <div class="student">
    <AppBar
      :routes="updatedRoutes"
      :notification="notification"
      :user="userInformation"
      :is-account-menu-dropdown-close-on-click="
        isAccountMenuDropdownCloseOnClick
      "
    >
      <template v-slot:account-menu-dropdown>
        <AppBarMenuDropdownStudent
          :teams="teams"
          @goToTeam="goToTeam"
          @goToAccountSettings="goToAccountSettings"
          @goToCreateTeam="goToCreateTeam"
          @logout="logout"
        />
      </template>
    </AppBar>
    <v-container>
      <transition name="fade" mode="out-in">
        <router-view class="mt-5" />
      </transition>
    </v-container>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import AppBarMenuDropdownStudent from "@/components/student/AppBarMenuDropdownStudent.vue";

import { mapGetters, mapActions } from "vuex";
import { STUDENT_GETTERS } from "./store/types";
import { ROOT_GETTERS, ROOT_ACTIONS } from "@/store/types";
import { MODULES } from "@/utils/constants";
import { capitalizeFirstLetter } from "@/utils/helpers";

export default {
  name: "Student",
  components: { AppBar, AppBarMenuDropdownStudent },
  data: function () {
    return {
      isAccountMenuDropdownCloseOnClick: false,
      user: {
        name: "Dodoy",
        profile: "",
        image:
          "https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg",
      },
      teams: [
        {
          id: 1,
          name: "Bud",
        },
        {
          id: 2,
          name: "Device",
        },
        {
          id: 3,
          name: "Worlds",
        },
      ],
      routes: [
        {
          name: "Home",
          path: { name: "Student Dashboard" },
        },
        {
          name: "Archive",
          path: { name: "Archive" },
        },
      ],
      teamRoutes: [
        {
          name: "Research Details",
          path: { name: "Research Details" },
        },
        {
          name: "Research Paper",
          path: { name: "Research Paper Editor" },
        },
      ],
      notification: {
        path: { name: "Student Invitation" },
      },
    };
  },
  computed: {
    ...mapGetters({
      hasMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_HAS_MEMBERSHIPS}`,
      getUser: ROOT_GETTERS.GET_USER,
    }),
    userInformation() {
      return {
        ...this.user,
        name: capitalizeFirstLetter(this.getUser.lastName || "User"),
      };
    },
    updatedRoutes() {
      if (this.hasMemberships)
        return [this.routes[0], ...this.teamRoutes, this.routes[1]];
      else return this.routes;
    },
  },
  methods: {
    ...mapActions({
      onFetchMemberships: ROOT_ACTIONS.FETCH_MEMBERSHIPS,
      onLogoutUser: ROOT_ACTIONS.LOGOUT_USER,
    }),
    setIsAccountMenuDropdownCloseOnClick() {
      this.isAccountMenuDropdownCloseOnClick = true;
      setTimeout(() => {
        this.isAccountMenuDropdownCloseOnClick = false;
      }, 500);
    },
    goToTeam(team) {
      this.setIsAccountMenuDropdownCloseOnClick();
      this.$router.push({ name: "Student Dashboard" });
      console.log(team);
    },
    goToAccountSettings() {
      this.setIsAccountMenuDropdownCloseOnClick();
      this.$router.push({ name: "Student Account Settings" });
    },
    goToCreateTeam() {
      this.setIsAccountMenuDropdownCloseOnClick();
      this.$router.push({ name: "Create Team" });
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
