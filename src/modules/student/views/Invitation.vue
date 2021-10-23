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
    <JoinTeamModal
      :dialog-props="joinTeamModal"
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
import { ACTIONS } from "../store/types/actions";
import { GETTERS } from "../store/types/getters";
import { UTILS } from "../constants/utils";
import { TEAM } from "@/utils/constants/team";

export default {
  name: "StudentInvitation",
  components: {
    InvitationMessage,
    InvitationRow,
    JoinTeamModal,
  },
  data: function () {
    return {
      joinTeamModal: false,
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
      getInvitations: `${UTILS.STORE_MODULE_PATH}${GETTERS.GET_INVITATIONS}`,
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
    getInvitations: {
      deep: true,
      handler() {
        this.setInvitations();
      },
    },
  },
  methods: {
    ...mapActions({
      onUpdateInvitation: `${UTILS.STORE_MODULE_PATH}${ACTIONS.UPDATE_INVITATION}`,
    }),
    setInvitations() {
      this.invitations = this.getInvitations;
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
      } catch (error) {
        console.log(error);
      }
    },
    async joinTeam(code) {
      console.log("joinTeam called ", code);
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
}
</style>
