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
      <ModalKickstartResearch
        :user="getUser"
        :is-loading="isSubmitTeamCode"
        :dialog-props="kickstartResearchModal"
        @dialogClose="kickstartResearchModal = $event"
        @dialogKickstartResearch="kickstartResearch"
      ></ModalKickstartResearch>
    </div>
  </div>
</template>

<script>
import TeamTracker from "@/components/student/dashboard/TeamTracker";
import TasksBoard from "@/components/student/dashboard/TasksBoard";
import IndividualInsight from "@/components/student/dashboard/IndividualInsight";
import Tabs from "@/components/Tabs";
import JoinTeamModal from "@/components/student/JoinTeamModal.vue";
import ModalKickstartResearch from "@/components/student/ModalKickstartResearch.vue";

import { mapActions, mapGetters } from "vuex";
import { ROOT_GETTERS } from "@/store/types";
import { STUDENT_ACTIONS, STUDENT_GETTERS } from "../store/types";
import { MODULES, STATUS_CODES } from "@/utils/constants";

export default {
  name: "Dashboard",
  components: {
    TeamTracker,
    TasksBoard,
    IndividualInsight,
    Tabs,
    JoinTeamModal,
    ModalKickstartResearch,
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
      getUser: `${ROOT_GETTERS.GET_USER}`,
      hasMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_HAS_MEMBERSHIPS}`,
      getSelectedTeam: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM}`,
    }),
  },
  mounted() {
    setTimeout(() => {
      this.showKickstartResearchModal();
    }, 500);
  },
  methods: {
    ...mapActions({
      onJoinTeamCode: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.JOIN_CODE_TEAM}`,
    }),
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
      this.$router.push({
        name: "Research Details",
        query: { tab: "create-new" },
      });
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
