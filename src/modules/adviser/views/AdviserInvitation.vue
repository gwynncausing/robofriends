<template>
  <div class="invitation">
    <div class="message">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import USER_INVITATIONS from "@/graphql/queries/user-invitations.gql";
import UPDATE_INVITATION from "@/graphql/mutations/update-invitation.gql";
import InvitationMessage from "@/components/InvitationMessage.vue";
import InvitationRow from "@/components/InvitationRow.vue";
export default {
  name: "AdviserInvitation",
  components: {
    InvitationMessage,
    InvitationRow,
  },
  data: function () {
    return {
      userType: "adviser",
      invitations: [],
    };
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
  watch: {
    invitationsFromServer() {
      this.initialize();
    },
  },
  methods: {
    initialize() {
      this.invitations = [];
      this.invitationsFromServer.edges.forEach((edge) => {
        this.invitations.push({
          id: edge.node.id,
          projectId: edge.node.project.id,
          teamName: edge.node.project.teamName,
          description: edge.node.project.description,
          status: edge.node.status,
          createdAt: edge.node.createdAt,
        });
      });
      console.log({ invitations: this.invitations });
    },
    async updateInvitation({ invitationId, isAccepted, projectId }) {
      const input = { invitationId, isAccepted, projectId };
      try {
        const result = await this.$apollo.mutate({
          mutation: UPDATE_INVITATION,
          variables: { input },
        });
        const invitation = result.data.updateInvitation.invitation;
        if (invitation.status === "ACCEPTED") this.$router.push("/adviser");
        else if (invitation.status === "DECLINED") {
          // handle decline
        }
      } catch (error) {
        console.log(error);
      }
    },
    removeInvitationFromList() {
      // remove invitation from list
    },
  },
  apollo: {
    invitationsFromServer: {
      query: USER_INVITATIONS,
      update: (data) => data.invitations,
      variables() {
        return {
          invitedEmail: this.getUser.email,
          status: "pending",
        };
      },
      pollInterval: 10000,
    },
  },
};
</script>

<style lang="scss" scoped>
.invitation {
  display: flex;
  justify-content: center;
}
.message {
  margin: 0;
  padding: 0;
  position: relative;
  width: 70%;
  margin-top: 5%;
}
</style>
