<template>
  <div id="teamlist">
    <div class="teamlist-wrapper">
      <v-data-table
        id="teamlist-table"
        :headers="headers"
        :items="teams"
        :search="search"
      >
        <template v-slot:top>
          <v-row>
            <v-col md="5" sm="6" offset-sm="6" offset-md="7">
              <TextField
                v-model="search"
                label="Search here . . ."
                append-icon="mdi-magnify"
                width="50%"
                class="search-field"
              ></TextField>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="py-2">
            <Button class="ma-1" small @click="viewTeamDetails(item)">
              View
            </Button>
            <Button
              class="ma-1"
              color="secondary"
              small
              @click="requestToJoinTeam(item)"
            >
              Request to Join
            </Button>
          </div>
        </template>
        <template v-slot:no-data>No Teams Availables</template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import TextField from "@/components/global/TextField.vue";
export default {
  name: "TeamList",
  components: {
    Button,
    TextField,
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Team Name",
        align: "start",
        value: "teamName",
        sortable: false,
        class: ["neutral-800--text", "font-bold"],
        cellClass: ["neutral-800--text"],
        width: "50%",
      },
      {
        text: "Code",
        value: "code",
        align: "center",
        sortable: false,
        class: ["neutral-800--text", "font-bold"],
        cellClass: ["neutral-800--text"],
      },
      {
        text: "Members",
        value: "members",
        align: "center",
        sortable: false,
        class: ["neutral-800--text", "font-bold"],
        cellClass: ["neutral-800--text"],
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        class: ["neutral-800--text", "font-bold"],
        cellClass: ["neutral-800--text"],
      },
    ],
    teams: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.teams = [
        {
          id: 0,
          teamName: "Cary and Co.",
          code: 15934,
          members: 5,
          actions: 1,
        },
        {
          id: 1,
          teamName: "Co. and Cary",
          code: 33315,
          members: 5,
          actions: 1,
        },
        {
          id: 2,
          teamName: "Rafael and Co.",
          code: 34177,
          members: 5,
          actions: 1,
        },
      ];
    },
    viewTeamDetails(item) {
      console.log("View Item Details: " + item.id);
    },
    requestToJoinTeam(item) {
      console.log("Request to Join Team: " + item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
#teamlist {
  text-align: -webkit-center;
  margin: clamp(56px, 2vw, 96px) 20px 20px 20px !important;
}
.teamlist-wrapper {
  max-width: 870px;
}
@media only screen and (max-width: $screen-size-xs-max) {
  .search-field {
    margin-bottom: -40px;
  }
}
</style>
