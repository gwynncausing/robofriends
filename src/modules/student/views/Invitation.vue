<template>
  <div class="invitation">
    <div class="invitation-wrapper">
      <InvitationMessage
        :invitations="pendingInvitationsCount"
        :user-type="userType"
      />
      <!-- // TODO:  enhance invitatiow row when joining/declining invitation -->
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
        <!-- // TODO:  change to go to create team -->
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
    <!-- // TODO:  to be implemented -->
    <JoinTeamModal
      :dialog-props="joinTeamModal"
      :is-loading="isSubmitTeamCode"
      @dialogClose="joinTeamModal = $event"
      @dialogJoinTeam="joinTeam($event)"
    />
  </div>
</template>

<script>
import InvitationMessage from "@/components/InvitationMessage.vue";
import InvitationRow from "@/components/InvitationRow.vue";
import JoinTeamModal from "@/components/student/JoinTeamModal.vue";

import { mapGetters, mapActions } from "vuex";
import { STUDENT_ACTIONS } from "../store/types/actions";
import { STUDENT_GETTERS } from "../store/types/getters";
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
      console.log("I am here in watch get invitations");
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
    }),
    fetchInvitations() {
      return this.onFetchInvitations();
    },
    setInvitations() {
      this.invitations = this.getInvitations;
      console.log(this.getInvitations);
    },
    async updateInvitation({ invitationId, status }) {
      const payload = {
        id: invitationId,
        invitation: {
          status: status,
        },
      };
      try {
        await this.onUpdateInvitation(payload);
        if (status === TEAM.INVITATION_STATUS.ACCEPTED)
          this.$router.push({ name: "Dashboard" });
        this.setInvitations();
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
        this.$router.push({ name: "Dashboard" });
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
