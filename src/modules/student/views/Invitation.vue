<template>
  <div class="invitation">
    <div class="invitation-wrapper">
      <InvitationMessage
        :invitations="invitations.length"
        :user-type="userType"
      />
      <InvitationRow
        v-for="invitation in invitations"
        :key="invitation.id"
        :team-name="invitation.teamName"
        :invitation="invitation"
        @updateInvitation="updateInvitation"
      />
    </div>
    <div class="invitation-create-or-join-team">
      <p>
        I want to
        <!-- // TODO:  change to go to create team -->
        <router-link class="primary--text" :to="{ name: 'CreateAccount' }">
          <strong>create my own team</strong>
        </router-link>
        or
        <!-- // TODO:  change to go to team list -->
        <router-link class="secondary--text" :to="{ name: 'CreateAccount' }">
          <strong>join another team</strong>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import InvitationMessage from "@/components/InvitationMessage.vue";
import InvitationRow from "@/components/InvitationRow.vue";
export default {
  name: "StudentInvitation",
  components: {
    InvitationMessage,
    InvitationRow,
  },
  data: function () {
    return {
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
    // ...mapGetters({
    //   getUser: "user/getUser",
    // }),
  },
  watch: {
    invitationsFromServer() {
      this.initialize();
    },
  },
  methods: {
    initialize() {
      this.invitations = [];
      // this.invitationsFromServer.edges.forEach((edge) => {
      //   this.invitations.push({
      //     id: edge.node.id,
      //     projectId: edge.node.project.id,
      //     teamName: edge.node.project.teamName,
      //     description: edge.node.project.description,
      //     status: edge.node.status,
      //     createdAt: edge.node.createdAt,
      //   });
      // });
      console.log({ invitations: this.invitations });
    },
    async updateInvitation({ invitationId, isAccepted, projectId }) {
      console.log(invitationId, isAccepted, projectId);
      // const input = { invitationId, isAccepted, projectId };
      // try {
      //   const result = await this.$apollo.mutate({
      //     mutation: UPDATE_INVITATION,
      //     variables: { input },
      //   });
      //   const invitation = result.data.updateInvitation.invitation;
      //   if (invitation.status === "ACCEPTED") this.$router.push("/student");
      //   else if (invitation.status === "DECLINED") {
      //     // handle decline
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
    removeInvitationFromList() {
      // remove invitation from list
    },
  },
};
</script>

<style lang="scss" scoped>
.invitation {
  margin: clamp(56px, 7vw, 96px) 20px 120px 20px !important;

  .invitation-wrapper {
    align-self: center;
    margin-bottom: 104px;
  }
  .invitation-create-or-join-team {
    text-align: center;
  }
}
</style>
