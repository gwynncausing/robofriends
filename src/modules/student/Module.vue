<template>
  <div class="student">
    <!-- // TODO:  Implement logout functionality -->
    <AppBar
      :routes="updatedRoutes"
      :notification="notification"
      :user="userInformation"
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
import { STUDENT_GETTERS } from "./store/types/getters";
import { ROOT_GETTERS } from "@/store/types/getters";
import { ROOT_ACTIONS } from "@/store/types/actions";
import { MODULES } from "@/utils/constants";
import { capitalizeFirstLetter } from "@/utils/helpers";

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
      if (this.hasMemberships) return [...this.routes, ...this.teamRoutes];
      else return this.routes;
    },
  },
  methods: {
    ...mapActions({
      onFetchMemberships: ROOT_ACTIONS.FETCH_MEMBERSHIPS,
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
