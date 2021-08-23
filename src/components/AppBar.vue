<template>
  <div>
    <v-app-bar elevation="2">
      <v-btn text>
        <v-img :src="require('@/assets/logo.png')" width="30" contain dense />
      </v-btn>

      <v-menu offset-y :close-on-content-click="false">
        <!-- open-on-hover -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <router-link :to="'/'"
              >Home <v-icon right>mdi-chevron-down</v-icon></router-link
            >
          </v-btn>
        </template>

        <v-list>
          <v-list-item-title
            v-for="(item, i) in home"
            :key="i"
            :to="{ name: item }"
          >
            <!-- :to="{ name: item }" -->
            <v-btn text block>
              <router-link :to="{ name: item }">{{ item }}</router-link>
            </v-btn>
          </v-list-item-title>
        </v-list>
      </v-menu>
      <v-btn text>
        <router-link :to="{ name: 'Archive' }">Archive</router-link>
      </v-btn>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn text block> Notification 1 </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text block> Notification 2 </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" text v-on="on">
            <v-avatar size="30" class="mr-2">
              <img
                src="https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg"
                alt="Profile"
              />
            </v-avatar>
            <!-- {{ getUser.lastName }} -->
            Test
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
// import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppBar",
  data() {
    return {
      username: "",
      home: [
        "Dashboard",
        "Project Details",
        "Recommended Guides",
        "Team Settings",
      ],
    };
  },
  computed: {
    // ...mapGetters({
    //   getUser: "user/getUser",
    // }),
  },
  methods: {
    logout() {
      this.onLogout();
      this.$router.push("/");
    },
    // ...mapActions({
    //   onLogout: "user/logout",
    // }),
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
