<template>
  <div id="dashboard">
    <!-- //* Remove negation to hasTeam to show team/join team -->
    <div v-if="!hasTeam" id="dashboard-no-team">
      <v-img :src="require('@/assets/invitation.svg')" width="600" />
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
          <router-link class="secondary--text" :to="{ name: 'CreateAccount' }">
            <strong>join</strong>
          </router-link>
          a team?
        </p>
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

export default {
  name: "Dashboard",
  components: {
    TeamTracker,
    TasksBoard,
    IndividualInsight,
    AppTabs,
  },
  data() {
    return {
      dialog: true,
      user: {
        teamList: {},
      },
      hasTeam: true,
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
    };
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  text-align: -webkit-center;
  margin: clamp(14px, 7vw, 24px) 20px 20px 20px !important;

  #dashboard-no-team {
    padding: 40px 16px;
  }
  .dashboard-cta {
    margin-top: 48px;
    h5 {
      margin-bottom: 16px;
    }
  }
}
</style>
