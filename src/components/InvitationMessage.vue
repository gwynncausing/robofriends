<template>
  <div class="mb-10">
    <v-img
      :src="require('@/assets/invitation.svg')"
      height="260"
      width="477"
    ></v-img>
    <div class="text">
      <span class="heading">
        <span v-if="invitations > 0">You’re invited!</span>
        <span v-else>No Invitations :(</span>
      </span>
      <p class="details">
        You received {{ invitations }} invitation/s to {{ action }} their team.
      </p>
    </div>
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
.text {
  position: absolute;
  top: 10%;
  left: 50%;
}

.heading {
  font-size: 46px;
  font-weight: bold;
  color: var(--v-secondary) !important;
}
.details {
  font-size: 16px;
}
</style>
