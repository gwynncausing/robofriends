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
        <span class="primary--text pointer" @click="joinAllTeams">
          <strong>join all teams</strong>
        </span>
        or
        <router-link :to="{ name: 'Adviser Dashboard' }">
          <span class="secondary--text pointer">
            <strong>leave it for now</strong>
          </span>
        </router-link>
      </p>
    </div>
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
import { ADVISER_ACTIONS, ADVISER_GETTERS } from "../store/types";
import { MODULES, TEAM } from "@/utils/constants";

export default {
  name: "AdviserInvitation",
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
      getInvitations: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_INVITATIONS}`,
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
      onFetchInvitations: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_INVITATIONS}`,
      onUpdateInvitation: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.UPDATE_INVITATION}`,
      onJoinCodeTeam: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.JOIN_CODE_TEAM}`,
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
        await this.onUpdateInvitation(payload);
        if (status === TEAM.INVITATION_STATUS.ACCEPTED);
        this.setInvitations();
      } catch (error) {
        console.log(error);
      }
    },
    createUpdateInvitationPromise(payload) {
      return this.onUpdateInvitation(payload);
    },
    async joinAllTeams() {
      try {
        const pendingInvitations = this.invitations.filter(
          (invitation) => invitation.status === TEAM.INVITATION_STATUS.PENDING
        );
        const updateInvitationsPromises = pendingInvitations.map(
          (invitation) => {
            const payload = {
              id: invitation.id,
              invitation: {
                status: TEAM.INVITATION_STATUS.ACCEPTED,
              },
            };
            return this.onUpdateInvitation(payload);
          }
        );
        await Promise.all(updateInvitationsPromises);
      } catch (error) {
        console.log(error);
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
  .pointer {
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
