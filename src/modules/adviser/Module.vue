<template>
  <div class="adviser">
    <AppBar
      :routes="routes"
      :notification="notification"
      :user="user"
      @logout="logout"
    />
    <v-container>
      <transition name="fade" mode="out-in">
        <router-view class="mt-5" />
      </transition>
    </v-container>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

import { mapGetters, mapActions } from "vuex";
import { ROOT_GETTERS } from "@/store/types/getters";
import { ROOT_ACTIONS } from "@/store/types/actions";
import { capitalizeFirstLetter } from "@/utils/helpers";

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
          path: { name: "Adviser Dashboard" },
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
