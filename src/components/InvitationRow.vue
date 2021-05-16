<template>
  <div>
    <v-row class="mx-8">
      <v-col cols="8">
        <v-sheet outlined rounded height="48">
          <span class="team-name">{{ teamName }}</span>
        </v-sheet>
      </v-col>
      <v-col>
        <v-btn-toggle>
          <v-btn @click="view"> View </v-btn>
          <v-btn class="btn-white btn-deny" @click="deny"> Deny </v-btn>
          <v-btn class="btn-white btn-join" @click="join"> Join </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "InvitationMessage",
  props: {
    teamName: {
      type: String,
      default: "",
    },
    invitation: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    view() {
      console.log("view " + this.teamName);
    },
    deny() {
      console.log("deny " + this.teamName);
      const params = {
        invitationId: this.invitation.id,
        projectId: this.invitation.projectId,
        isAccepted: false,
      };
      this.$emit("updateInvitation", params);
    },
    join() {
      console.log("join " + this.teamName);
      console.log(this.invitation.id);
      const params = {
        invitationId: this.invitation.id,
        projectId: this.invitation.projectId,
        isAccepted: true,
      };
      this.$emit("updateInvitation", params);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-sheet {
  display: flex;
  align-items: center;
}
.team-name {
  padding: 2%;
}
.btn-white {
  color: white !important;

  &.btn-deny {
    background-color: var(--v-secondary) !important;
  }

  &.btn-join {
    background-color: var(--v-primary) !important;
  }
}
</style>
