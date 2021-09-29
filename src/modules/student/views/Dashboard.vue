<template>
  <div id="dashboard">
    <!-- //* Remove negation to hasTeam to show team/join team -->
    <div v-if="!hasTeam" id="dashboard-no-team">
      <v-img :src="require('@/assets/dashboard-no-team.svg')" width="400" />
      <div class="dashboard-cta">
        <h5>Looks like you don’t have a team yet.</h5>
        <p>
          Do you want to
          <!-- // TODO:  change to go to create team -->
          <router-link class="primary--text" :to="{ name: 'CreateAccount' }">
            <strong>create</strong>
          </router-link>
          or
          <!-- // TODO:  change to go to team list -->
          <span
            class="secondary--text btn-join-team"
            @click="
              {
                joinTeamModal = true;
              }
            "
          >
            <strong>join</strong>
          </span>
          a team?
        </p>
        <JoinTeamModal :dialog="joinTeamModal" @closed="joinTeamModal = $event">
          <template v-slot:title>
            <h4>Join a team</h4>
            <span class="subheading1 neutral-500--text">
              Enter the team code given by your friend
            </span>
          </template>
          <template v-slot:content>
            <TextField v-model="teamCode" placeholder="Team code"> </TextField>
          </template>
          <template v-slot:footer>
            <v-spacer></v-spacer>
            <Button text @click="joinTeamModal = false">Cancel</Button>
            <Button @click="joinTeam()">Submit</Button>
          </template>
        </JoinTeamModal>
      </div>
    </div>
    <div v-else id="dashboard-has-team">
      <AppTabs active="team-tracker" :items="items">
        <template v-slot:body-team-tracker>
          <TeamTracker />
        </template>
        <template v-slot:body-individual-insight>
          <IndividualInsight />
        </template>
        <template v-slot:body-tasks-board>
          <TasksBoard />
        </template>
      </AppTabs>
    </div>
  </div>
</template>

<script>
import TeamTracker from "./dashboard/TeamTracker";
import TasksBoard from "./dashboard/TasksBoard";
import IndividualInsight from "./dashboard/IndividualInsight";
import AppTabs from "../components/AppTabs";
import JoinTeamModal from "../components/JoinTeamModal";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "Dashboard",
  components: {
    TeamTracker,
    TasksBoard,
    IndividualInsight,
    AppTabs,
    JoinTeamModal,
    TextField,
    Button,
  },
  data() {
    return {
      joinTeamModal: false,
      user: {
        teamList: {},
      },
      hasTeam: false,
      items: [
        {
          title: "Team Tracker",
          value: "team-tracker",
        },
        {
          title: "Individual Insight",
          value: "individual-insight",
        },
        {
          title: "Tasks Board",
          value: "tasks-board",
        },
      ],
      teamCode: "",
    };
  },
  methods: {
    joinTeam() {
      console.log("joinTeam called ", this.teamCode);
    },
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  text-align: -webkit-center;
  margin: clamp(14px, 7vw, 24px) 20px 20px 20px !important;

  #dashboard-no-team {
    padding: 40px 16px;

    .btn-join-team {
      cursor: pointer;
    }
  }
  .dashboard-cta {
    margin-top: 48px;
    h5 {
      margin-bottom: 16px;
    }
  }
}
</style>
