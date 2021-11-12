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
<<<<<<< HEAD
          :current-selected-team="selectedTeam"
=======
          :current-selected-team="selectedTeamDetails"
>>>>>>> feature/tiptap
          @goToTeam="goToTeam"
          @goToAccountSettings="goToAccountSettings"
          @goToCreateTeam="goToCreateTeam"
          @logout="logout"
        />
      </template>
    </AppBar>
    <v-container>
      <transition name="fade" mode="out-in">
<<<<<<< HEAD
        <router-view class="mt-5" />
=======
        <router-view />
>>>>>>> feature/tiptap
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
import { capitalizeFirstLetter } from "@/utils/helpers";

export default {
  name: "Student",
  components: { AppBar, AppBarMenuDropdownStudent },
  data: function () {
    return {
<<<<<<< HEAD
      selectedTeam: {},
=======
      selectedTeamDetails: {},
>>>>>>> feature/tiptap
      isAccountMenuDropdownCloseOnClick: false,
      user: {
        name: "Dodoy",
        profile: "",
        image:
          "https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg",
      },
      teams: [],
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
<<<<<<< HEAD
=======
        {
          name: "Team",
          path: { name: "Team Settings" },
        },
>>>>>>> feature/tiptap
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
<<<<<<< HEAD
      getSelectedTeam: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM}`,
=======
      getSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS}`,
>>>>>>> feature/tiptap
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
        return [this.routes[0], ...this.teamRoutes, this.routes[1]];
      else return this.routes;
    },
  },
  async created() {
    try {
      await this.onFetchMemberships();
      this.setTeams();
<<<<<<< HEAD
      if (Object.keys(this.getSelectedTeam).length === 0)
        await this.setSelectTeam(this.teams[0] || {});
      this.selectedTeam = this.getSelectedTeam;
=======
      if (Object.keys(this.getSelectedTeamDetails).length === 0)
        await this.setSelectedTeamDetails(this.teams[0] || {});
      this.selectedTeamDetails = this.getSelectedTeamDetails;
>>>>>>> feature/tiptap
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions({
      onFetchMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_MEMBERSHIPS}`,
<<<<<<< HEAD
      onSelectTeam: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.SELECT_TEAM}`,
=======
      onFetchSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SELECTED_TEAM_DETAILS}`,
>>>>>>> feature/tiptap
      onLogoutUser: ROOT_ACTIONS.LOGOUT_USER,
    }),
    setIsAccountMenuDropdownCloseOnClick() {
      this.isAccountMenuDropdownCloseOnClick = true;
      setTimeout(() => {
        this.isAccountMenuDropdownCloseOnClick = false;
      }, 500);
    },
    setTeams() {
      this.teams = this.getMemberships.map((memberships) => memberships.team);
    },
<<<<<<< HEAD
    setSelectTeam(team) {
      return this.onSelectTeam({ team: team });
=======
    setSelectedTeamDetails(team) {
      console.log(team);
      return this.onFetchSelectedTeamDetails({ id: team.id });
>>>>>>> feature/tiptap
    },
    async goToTeam(team) {
      if (!this.getIsLoggedIn) return;
      try {
        this.setIsAccountMenuDropdownCloseOnClick();
<<<<<<< HEAD
        await this.setSelectTeam(team);
        this.selectedTeam = this.getSelectedTeam;
=======
        await this.setSelectedTeamDetails(team);
        this.selectedTeamDetails = this.getSelectedTeamDetails;
>>>>>>> feature/tiptap
        this.$router.push({ name: "Student Dashboard" });
        this.$router.go();
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
