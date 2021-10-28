<template>
  <div id="dashboard">
    <div v-if="!hasMemberships" id="dashboard-no-team">
      <v-img :src="require('@/assets/dashboard-no-team.svg')" width="400" />
      <div class="dashboard-cta">
        <h5>Looks like you don’t have a team yet.</h5>
        <div v-if="error" class="errors">
          {{ error }}
        </div>
        <p>
          Do you want to
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
          :is-loading="isSubmitTeamCode"
          @dialogClose="joinTeamModal = $event"
          @dialogJoinTeam="joinTeam($event)"
        />
      </div>
    </div>
    <div v-else id="dashboard-has-team">
      <Tabs active="team-tracker" :items="items">
        <template v-slot:body-team-tracker>
          <TeamTracker />
        </template>
        <template v-slot:body-individual-insight>
          <IndividualInsight />
        </template>
        <template v-slot:body-tasks-board>
          <TasksBoard />
        </template>
      </Tabs>
      <!-- // TODO:  redirect kickstartResearch to create proposal page -->
      <KickstartResearchModal
        :is-loading="isSubmitTeamCode"
        :dialog-props="kickstartResearchModal"
        @dialogClose="kickstartResearchModal = $event"
        @dialogKickstartResearch="kickstartResearch"
      ></KickstartResearchModal>
    </div>
  </div>
</template>

<script>
import TeamTracker from "@/components/student/dashboard/TeamTracker";
import TasksBoard from "@/components/student/dashboard/TasksBoard";
import IndividualInsight from "@/components/student/dashboard/IndividualInsight";
import Tabs from "@/components/Tabs";
import JoinTeamModal from "@/components/student/JoinTeamModal.vue";
import KickstartResearchModal from "@/components/student/KickstartResearchModal.vue";

import { mapActions, mapGetters } from "vuex";
import { STUDENT_ACTIONS } from "../store/types/actions";
import { STUDENT_GETTERS } from "../store/types/getters";
import { MODULES, STATUS_CODES } from "@/utils/constants";

export default {
  name: "Dashboard",
  components: {
    TeamTracker,
    TasksBoard,
    IndividualInsight,
    Tabs,
    JoinTeamModal,
    KickstartResearchModal,
  },
  data() {
    return {
      error: "",
      joinTeamModal: false,
      kickstartResearchModal: false,
      isSubmitTeamCode: false,
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
  computed: {
    ...mapGetters({
      getMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_MEMBERSHIPS}`,
      hasMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_HAS_MEMBERSHIPS}`,
      getSelectedTeam: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM}`,
    }),
  },
  async created() {
    try {
      await this.fetchMemberships();
      await this.selectTeam();
      this.showKickstartResearchModal();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions({
      onFetchMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_MEMBERSHIPS}`,
      onSelectTeam: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.SELECT_TEAM}`,
      onJoinTeamCode: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.JOIN_CODE_TEAM}`,
    }),
    async fetchMemberships() {
      return this.onFetchMemberships();
    },
    async selectTeam() {
      return this.onSelectTeam();
    },
    showKickstartResearchModal() {
      this.kickstartResearchModal = true;
    },
    async joinTeam(code) {
      try {
        this.isSubmitTeamCode = true;
        this.error = "";
        const payload = { code: code };
        await this.onJoinTeamCode(payload);
        this.$router.go();
      } catch (error) {
        switch (error?.response?.statusCode) {
          case STATUS_CODES.NOT_FOUND:
            this.error = "Team code doesn't exists.";
            break;
          default:
            console.log("Error", error);
            break;
        }
      } finally {
        this.isSubmitTeamCode = false;
        this.joinTeamModal = false;
      }
    },
    kickstartResearch() {
      console.log("kickstartResearch called");
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
  .errors {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    color: var(--v-error);
  }
}
</style>
