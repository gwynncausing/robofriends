<template>
  <div class="invitation-message">
    <div class="invitation-message-heading">
      <span v-if="invitations > 0" class="primary--text">You’re invited!</span>
      <span v-else class="secondary--text">No Invitations :(</span>
      <p class="subheading mt-10">
        You received {{ invitations }} invitation/s to {{ action }} their team.
      </p>
    </div>
    <v-img :src="require('@/assets/invitation.svg')" width="432" />
  </div>
</template>

<script>
export default {
  name: "InvitationMessage",
  props: {
    userType: {
      type: String,
      default: "",
    },
    invitations: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    action() {
      if (this.userType === "student") return "join";
      else return "guide";
    },
  },
};
</script>

<style lang="scss" scoped>
.invitation-message {
  text-align: -webkit-center;

  .invitation-message-heading {
    margin-bottom: 40px;
    span {
      font-size: 2.125rem;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
