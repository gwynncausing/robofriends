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
          <router-link class="primary--text" :to="{ name: 'Create Team' }">
            <strong>create</strong>
          </router-link>
          or
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
        <JoinTeamModal
          :dialog-props="joinTeamModal"
          @dialogClose="joinTeamModal = $event"
          @dialogJoinTeam="joinTeam($event)"
        />
      </div>
    </div>
    <div v-else id="dashboard-has-team">
      <AppTabsHolder active="team-tracker" :items="items">
        <template v-slot:body-team-tracker>
          <TeamTracker />
        </template>
        <template v-slot:body-individual-insight>
          <IndividualInsight />
        </template>
        <template v-slot:body-tasks-board>
          <TasksBoard />
        </template>
      </AppTabsHolder>
    </div>
  </div>
</template>

<script>
import TeamTracker from "../components/dashboard/TeamTracker";
import TasksBoard from "../components/dashboard/TasksBoard";
import IndividualInsight from "../components/dashboard/IndividualInsight";
import AppTabsHolder from "@/components/AppTabsHolder";
import JoinTeamModal from "../components/JoinTeamModal.vue";

export default {
  name: "Dashboard",
  components: {
    TeamTracker,
    TasksBoard,
    IndividualInsight,
    AppTabsHolder,
    JoinTeamModal,
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
    };
  },
  methods: {
    joinTeam(code) {
      console.log("joinTeam called ", code);
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
