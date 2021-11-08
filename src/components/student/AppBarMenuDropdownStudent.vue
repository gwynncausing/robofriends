<template>
  <v-list>
    <v-list-item
      class="text-right"
      active="primary"
      @click="goToAccountSettings"
    >
      <v-list-item-content
        class="button-font neutral-600--text d-flex justify-end"
        >Account Settings</v-list-item-content
      >
    </v-list-item>
    <v-list-item
      v-if="!hasMoreThanOneTeam"
      class="text-right"
      @click="goToCreateTeam"
    >
      <v-list-item-content
        class="button-font neutral-600--text d-flex justify-end"
        >Create Team</v-list-item-content
      >
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
            class="text-right"
          >
            <v-list-item-content
              class="button-font neutral-600--text d-flex justify-end"
              >{{ team.name }}</v-list-item-content
            >
          </v-list-item>
        </v-list-item-group>
        <v-list-item class="text-right" @click="goToCreateTeam">
          <v-list-item-content
            class="button-font neutral-600--text d-flex justify-end"
            >Create Team</v-list-item-content
          >
        </v-list-item>
      </v-list>
    </v-list-group>
    <v-divider></v-divider>
    <v-list-item class="text-right" @click="logout">
      <v-list-item-content
        class="button-font neutral-600--text d-flex justify-end"
        >Logout</v-list-item-content
      >
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
