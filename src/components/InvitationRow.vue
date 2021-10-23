<template>
  <div class="invitation-row">
    <v-sheet outlined rounded height="40">
      {{ teamName }}
    </v-sheet>
    <div class="invitation-row-buttons d-none d-sm-flex">
      <!-- // TODO: add dialog on click -->
      <Button class="neutral-50 neutral-900--text" @click="view"> View </Button>
      <Button class="secondary" @click="deny"> Deny </Button>
      <Button class="primary" @click="join"> Join </Button>
    </div>
    <div class="invitation-row-buttons d-flex d-sm-none">
      <!-- // TODO: add dialog on click -->
      <Button
        icon
        class="neutral-50 neutral-900--text invitation-row-button-mobile"
        @click="view"
      >
        <v-icon>mdi-eye</v-icon>
      </Button>
      <Button icon class="secondary invitation-row-button-mobile" @click="deny">
        <v-icon color="white">mdi-close-thick</v-icon>
      </Button>
      <Button icon class="primary invitation-row-button-mobile" @click="join">
        <v-icon color="white">mdi-check-bold</v-icon>
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import { TEAM } from "@/utils/constants/team";

export default {
  name: "InvitationMessage",
  components: { Button },
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
      const params = {
        invitationId: this.invitation.id,
        status: TEAM.INVITATION_STATUS.DECLINED,
      };
      this.$emit("updateInvitation", params);
    },
    join() {
      const params = {
        invitationId: this.invitation.id,
        status: TEAM.INVITATION_STATUS.ACCEPTED,
      };
      this.$emit("updateInvitation", params);
    },
  },
};
</script>

<style lang="scss" scoped>
.invitation-row {
  display: flex;
  margin: 24px auto;
  max-width: 680px;

  .v-sheet {
    padding: 10px;
    margin-right: 16px;
    width: 100%;
  }
  .invitation-row-buttons {
    display: flex;
  }
  .invitation-row-button-mobile {
    width: 50px;
  }
  .invitation-row-buttons button:nth-child(1) {
    border-radius: 4px 0 0 4px;
  }
  .invitation-row-buttons button:nth-child(2) {
    border-radius: 0;
  }
  .invitation-row-buttons button:nth-child(3) {
    border-radius: 0 4px 4px 0;
  }
}
</style>
