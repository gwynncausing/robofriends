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
<<<<<<< HEAD
=======
    <v-snackbar
      v-model="isSnackbarShown"
      :timeout="3000"
      elevation="24"
      color="white"
      class="mb-3"
      content-class="neutral-800--text"
    >
      <div v-if="invitationAction === 'Deny'">
        You have
        <span class="secondary--text font-weight-bold">declined</span> team
        <span class="font-weight-bold">{{ teamName }}</span
        >'s invitation.
      </div>
      <div v-else-if="invitationAction === 'Join'">
        You have
        <span class="primary--text font-weight-bold">accepted</span> team
        <span class="font-weight-bold">{{ teamName }}</span
        >'s invitation.
      </div>
      <div v-else>
        You have
        <span class="primary--text font-weight-bold">accepted the teams'</span>
        invitation.
      </div>
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
>>>>>>> feature/tiptap
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
<<<<<<< HEAD
=======
      isSnackbarShown: false,
      teamName: "",
      invitationAction: "Join",
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
<<<<<<< HEAD
        if (status === TEAM.INVITATION_STATUS.ACCEPTED);
=======
        this.isSnackbarShown = true;
        this.teamName = invitation.team.name;
        if (status === TEAM.INVITATION_STATUS.ACCEPTED)
          this.invitationAction = "Join";
        else this.invitationAction = "Deny";
>>>>>>> feature/tiptap
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
<<<<<<< HEAD
=======
        this.isSnackbarShown = true;
        this.invitationAction = "Join All";
>>>>>>> feature/tiptap
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
