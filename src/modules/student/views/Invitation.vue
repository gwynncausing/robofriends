<template>
  <div class="invitation">
    <div class="invitation-wrapper">
      <InvitationMessage
        :invitations="pendingInvitationsCount"
        :user-type="userType"
      />
      <InvitationRow
        v-for="invitation in pendingInvitations"
        :key="invitation.id"
        :team-name="invitation.team.name"
        :invitation="invitation"
        @updateInvitation="updateInvitation"
      />
    </div>
    <div class="invitation-create-or-join-team">
      <div v-if="error" class="errors">
        {{ error }}
      </div>
      <p>
        I want to
        <router-link class="primary--text" :to="{ name: 'Create Team' }">
          <strong>create my own team</strong>
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
          <strong>join another team</strong>
        </span>
      </p>
    </div>
    <JoinTeamModal
      :dialog-props="joinTeamModal"
      :is-loading="isSubmitTeamCode"
      @dialogClose="joinTeamModal = $event"
      @dialogJoinTeam="joinTeam($event)"
    />
    <v-snackbar
      v-model="isSnackbarShown"
      :timeout="3000"
      elevation="24"
      color="white"
      class="mb-3"
      content-class="neutral-800--text"
    >
      You have
      <span class="secondary--text font-weight-bold">declined</span> team
      <span class="font-weight-bold">{{ teamName }}</span
      >'s invitation.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="error"
          text
          v-bind="attrs"
          icon
          @click="isSnackbarShown = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import InvitationMessage from "@/components/InvitationMessage.vue";
import InvitationRow from "@/components/InvitationRow.vue";
import JoinTeamModal from "@/components/student/JoinTeamModal.vue";

import { mapGetters, mapActions } from "vuex";
import { STUDENT_ACTIONS, STUDENT_GETTERS } from "../store/types";
import { MODULES, TEAM, STATUS_CODES } from "@/utils/constants";

export default {
  name: "StudentInvitation",
  components: {
    InvitationMessage,
    InvitationRow,
    JoinTeamModal,
  },
  data: function () {
    return {
<<<<<<< HEAD
=======
      isSnackbarShown: false,
      teamName: "Hello",
>>>>>>> feature/tiptap
      error: "",
      joinTeamModal: false,
      isSubmitTeamCode: false,
      userType: "student",
      invitations: [
        {
          id: "1",
          teamName: "Cary & Co.",
        },
        {
          id: "2",
          teamName: "Donee & Co.",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getInvitations: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_INVITATIONS}`,
    }),
    repliedInvitations() {
      return this.invitations.filter(
        (invitation) => invitation.status !== TEAM.INVITATION_STATUS.ACCEPTED
      );
    },
    pendingInvitations() {
      return this.invitations.filter(
        (invitation) => invitation.status === TEAM.INVITATION_STATUS.PENDING
      );
    },
    pendingInvitationsCount() {
      return this.pendingInvitations.length;
    },
  },
  watch: {
    getInvitations() {
      this.setInvitations();
    },
  },
  async created() {
    try {
      await this.fetchInvitations();
      this.setInvitations();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions({
      onFetchInvitations: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_INVITATIONS}`,
      onUpdateInvitation: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.UPDATE_INVITATION}`,
      onJoinCodeTeam: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.JOIN_CODE_TEAM}`,
<<<<<<< HEAD
      onSelectTeam: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.SELECT_TEAM}`,
=======
      onSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SELECTED_TEAM_DETAILS}`,
>>>>>>> feature/tiptap
    }),
    fetchInvitations() {
      return this.onFetchInvitations();
    },
    setInvitations() {
      this.invitations = this.getInvitations;
    },
    async updateInvitation({ invitation, status }) {
      const payload = {
        id: invitation.id,
        invitation: {
          status: status,
        },
      };
      try {
        console.log(invitation.team);
        await this.onUpdateInvitation(payload);
        await this.setSelectTeam(invitation.team);
<<<<<<< HEAD
        if (status === TEAM.INVITATION_STATUS.ACCEPTED)
          await this.$router.push({ name: "Student Dashboard" });
        await this.$router.go();
=======
        if (status === TEAM.INVITATION_STATUS.ACCEPTED) {
          await this.$router.push({ name: "Student Dashboard" });
          await this.$router.go();
        } else {
          this.isSnackbarShown = true;
          this.teamName = invitation.team.name;
        }
>>>>>>> feature/tiptap
      } catch (error) {
        console.log(error);
      }
    },
    async joinTeam(code) {
      try {
        this.isSubmitTeamCode = true;
        this.error = "";
        const payload = { code: code };
        await this.onJoinCodeTeam(payload);
<<<<<<< HEAD
        this.$router.push({ name: "Dashboard" });
=======
        await this.$router.push({ name: "Student Dashboard" });
        await this.$router.go();
>>>>>>> feature/tiptap
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
    setSelectTeam(team) {
<<<<<<< HEAD
      return this.onSelectTeam({ team: team });
=======
      return this.onSelectedTeamDetails({ id: team.id });
>>>>>>> feature/tiptap
    },
  },
};
</script>

<style lang="scss" scoped>
.invitation {
  margin: clamp(14px, 7vw, 24px) 20px 120px 20px !important;

  .invitation-wrapper {
    align-self: center;
    margin-bottom: 104px;
  }
  .invitation-create-or-join-team {
    text-align: center;
  }
  .btn-join-team {
    cursor: pointer;
  }
  .errors {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    color: var(--v-error);
  }
}
</style>
