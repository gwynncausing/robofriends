<template>
  <div id="appbar">
    <v-app-bar elevation="2" color="white">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <Button text disabled>
        <v-img
          :src="require('@/assets/bud-flower.png')"
          width="30"
          contain
          dense
        />
      </Button>
      <v-list-item-group
        mandatory
        class="hidden-sm-and-down d-md-flex align-md-center"
        active-class="primary-300 white--text"
      >
        <v-list-item
          v-for="(route, id) in routes"
          :key="id"
          style="border-radius: 5px"
          :to="route.path"
          :exact-path="true"
        >
          <v-list-item-title>
            <span class="button-font">{{ route.name }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" icon v-bind="attrs" v-on="on">
            <v-icon color="neutral-600">mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-title
            v-for="(notification, id) in notifications"
            :key="id"
          >
            <Button text block>
              <span class="neutral-600--text button-font">{{
                notification.name
              }}</span>
            </Button>
          </v-list-item-title>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="d-flex justify-center"
            color="primary"
            text
            :icon="isBreakpointMdAndUp"
            v-on="on"
          >
            <v-avatar size="30" class="d-flex justify-center">
              <img :src="user.image" alt="Profile" />
            </v-avatar>
            <div
              :class="[
                'ml-2',
                'neutral-600--text',
                'button-font',
                isBreakpointMdAndUp ? 'd-none' : 'd-flex',
              ]"
            >
              {{ user.name }}
              <v-icon right>mdi-chevron-down</v-icon>
            </div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-title class="d-flex justify-center">
            <Button
              :class="[isBreakpointMdAndUp ? '' : 'd-none']"
              text
              block
              :to="user.profile"
              disabled
            >
              <span class="neutral-600--text button-font">{{
                user.name
              }}</span></Button
            >
          </v-list-item-title>
          <v-list-item-title>
            <Button text block :to="user.profile">
              <span class="neutral-600--text button-font">Profile</span></Button
            >
          </v-list-item-title>
          <v-list-item-title>
            <Button text block @click="logout"
              ><span class="neutral-600--text button-font">Logout</span></Button
            >
          </v-list-item-title>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      class="hidden-md-and-up"
      absolute
      temporary
    >
      <v-list-item-group active-class="primary-300 white--text" class="pa-3">
        <v-list-item
          v-for="(route, id) in routes"
          :key="id"
          style="border-radius: 5px"
          :to="route.path"
          :exact="true"
        >
          <v-list-item-title class="button-font">
            {{ route.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";

export default {
  name: "AppBar",
  components: {
    Button,
  },
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
    notifications: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isBreakpointMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp ? false : true;
    },
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped>
.appbar {
  margin-bottom: 24px;
}
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
