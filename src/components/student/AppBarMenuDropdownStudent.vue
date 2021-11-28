<template>
  <v-list>
    <v-list-item active="primary" @click="goToAccountSettings">
      <v-list-item-content class="button-font neutral-600--text">
        Account Settings
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="!hasMoreThanOneTeam" @click="goToCreateTeam">
      <v-list-item-content class="button-font neutral-600--text">
        Create Team
      </v-list-item-content>
    </v-list-item>
    <v-list-group v-else append-icon="" :value="isTeamActive">
      <template v-slot:activator>
        <v-list-item class="pr-0">
          <v-list-item-content
            class="button-font neutral-600--text d-flex justify-end"
            >Teams</v-list-item-content
          >
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="selectedTeam" mandatory>
          <v-list-item
            v-for="(team, index) in teams"
            :key="index"
            :value="team.id"
          >
            <v-list-item-content class="button-font neutral-600--text">
              {{ team.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item @click="goToCreateTeam">
          <v-list-item-content class="button-font neutral-600--text">
            Create Team
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list-group>
    <v-divider></v-divider>
    <v-list-item @click="logout">
      <v-list-item-content class="button-font neutral-600--text">
        Logout
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "Student",
  components: {},
  props: {
    teams: {
      type: Array,
      default: () => [],
    },
    currentSelectedTeam: {
      type: Object,
      default: () => {},
    },
  },
  data: function () {
    return {
      model: 1,
      isTeamActive: false,
    };
  },
  computed: {
    hasMoreThanOneTeam() {
      return this.teams.length > 1;
    },
    selectedTeam: {
      get: function () {
        return this.currentSelectedTeam.id;
      },
      set: function (teamId) {
        this.$emit(
          "goToTeam",
          this.teams.find((team) => team.id === teamId)
        );
      },
    },
  },
  methods: {
    logout() {
      this.isTeamActive = false;
      this.$emit("logout");
    },
    goToAccountSettings() {
      this.$emit("goToAccountSettings");
    },
    goToCreateTeam() {
      this.$emit("goToCreateTeam");
    },
  },
};
</script>
