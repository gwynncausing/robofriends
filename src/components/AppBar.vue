<template>
  <div>
    <v-app-bar>
      <v-btn text>
        <v-img :src="require('@/assets/logo.svg')" width="30" contain dense />
      </v-btn>

      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <router-link :to="'/'"
              >Home <v-icon right>mdi-chevron-down</v-icon></router-link
            >
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in home" :key="i">
              <v-list-item-title>
                <router-link :to="item.route">{{ item.name }}</router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-btn text> Consultation </v-btn>
      <v-btn text> Archive </v-btn>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-title>
            <v-btn text block> Notification 1 </v-btn>
          </v-list-item-title>
          <v-list-item-title>
            <v-btn text block> Notification 2 </v-btn>
          </v-list-item-title>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text>
            <v-icon left medium>mdi-account</v-icon>
            Legaspi
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-title>
            <v-btn text block to="/student/profile"> Profile </v-btn>
          </v-list-item-title>
          <v-list-item-title>
            <v-btn text block @click="logout"> Logout </v-btn>
          </v-list-item-title>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppBar",
  data() {
    return {
      username: "",
      home: [
        {
          name: "Dashboard",
          route: "/",
        },
        {
          name: "Project Details",
          route: "/project-details",
        },
        {
          name: "Recommended Guide",
          route: "/recommended-guide",
        },
        {
          name: "Team Settings",
          route: "/team-settings",
        },
      ],
    };
  },
  methods: {
    logout() {
      // this.onLogout();
      this.$router.push("/");
    },
    ...mapActions({
      // onLogout: "user/logout",
    }),
  },
  computed: {
    ...mapGetters({
      // getUserType: "user/getUserType",
    }),
  },
};
</script>

<style scoped>
.title {
  font-family: "aqumregular" !important;
  color: #8c383e;
  font-size: 2em !important;
}

.nav-link {
  font-weight: bold;
}

a {
  text-decoration: none;
  color: black;
}
</style>
