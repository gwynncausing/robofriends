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
      />
    </div>
  </div>
</template>

<script>
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
          teamName: "Cary & Co.",
        },
        {
          teamName: "Donee & Co.",
        },
      ],
    };
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
