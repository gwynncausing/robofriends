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
          :current-selected-team="selectedTeamDetails"
          @goToTeam="goToTeam"
          @goToAccountSettings="goToAccountSettings"
          @goToCreateTeam="goToCreateTeam"
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
import AppBarMenuDropdownStudent from "@/components/student/AppBarMenuDropdownStudent.vue";

import { mapGetters, mapActions } from "vuex";
import { STUDENT_GETTERS, STUDENT_ACTIONS } from "./store/types";
import { ROOT_GETTERS, ROOT_ACTIONS } from "@/store/types";
import { MODULES } from "@/utils/constants";
import { capitalizeFirstLetter, isObjectEmpty } from "@/utils/helpers";

export default {
  name: "Student",
  components: { AppBar, AppBarMenuDropdownStudent },
  data: function () {
    return {
      selectedTeamDetails: {},
      isAccountMenuDropdownCloseOnClick: false,
      user: {
        name: "Dodoy",
        profile: "",
        image:
          "https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg",
      },
      teams: [],
      routes: [
        // {
        //   name: "Home",
        //   path: { name: "Student Dashboard" },
        // },
        {
          name: "Archive",
          path: { name: "Student Archive" },
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
        {
          name: "Team",
          path: { name: "Team Settings" },
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
      getMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_MEMBERSHIPS}`,
      getSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS}`,
      getUser: ROOT_GETTERS.GET_USER,
      getIsLoggedIn: ROOT_GETTERS.GET_IS_LOGGED_IN,
    }),
    userInformation() {
      return {
        ...this.user,
        name: capitalizeFirstLetter(this.getUser.lastName || "User"),
      };
    },
    updatedRoutes() {
      if (this.hasMemberships)
        // return [this.routes[0], ...this.teamRoutes, this.routes[1]];
        return [...this.teamRoutes, this.routes[0]];
      else return this.routes;
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions({
      onFetchMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_MEMBERSHIPS}`,
      onFetchSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SELECTED_TEAM_DETAILS}`,
      onLogoutUser: ROOT_ACTIONS.LOGOUT_USER,
    }),

    async initialize() {
      try {
        await this.onFetchMemberships();
        this.setTeams();
        if (isObjectEmpty(this.getSelectedTeamDetails))
          await this.setSelectedTeamDetails(this.teams[0] || {});
        this.selectedTeamDetails = this.getSelectedTeamDetails;
      } catch (error) {
        console.log(error);
      }
    },

    setIsAccountMenuDropdownCloseOnClick() {
      this.isAccountMenuDropdownCloseOnClick = true;
      setTimeout(() => {
        this.isAccountMenuDropdownCloseOnClick = false;
      }, 500);
    },

    setTeams() {
      this.teams = this.getMemberships.map((memberships) => memberships.team);
    },

    setSelectedTeamDetails(team) {
      return this.onFetchSelectedTeamDetails({ id: team.id });
    },

    async goToTeam(team) {
      if (!this.getIsLoggedIn) return;
      try {
        this.setIsAccountMenuDropdownCloseOnClick();
        await this.setSelectedTeamDetails(team);
        this.selectedTeamDetails = this.getSelectedTeamDetails;
        window.location.href = "/student/research-details?tab=proposals";
      } catch (error) {
        console.log(error);
      }
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
