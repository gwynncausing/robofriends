<template>
  <div id="account-settings" class="d-flex justify-center">
    <v-form
      ref="settings-form"
      lazy-validation
      @submit.prevent="finishOnboarding()"
    >
      <div id="account-settings-wrapper" class="mt-6">
        <header>
          <h5 class="tertiary--text">{{ team.name }} Settings</h5>
        </header>
        <div id="members" class="mt-8">
          <div class="d-flex mb-8">
            <h6>Members</h6>
            <v-spacer></v-spacer>
            <Button text @click="inviteMemberModal = true"
              >Invite Member</Button
            >
          </div>
          <v-row v-for="(member, index) in team.members" :key="index">
            <v-col cols="8" class="row-details">
              <TextField
                :label="member.email"
                placeholder="Member 1"
                :disabled="true"
              />
            </v-col>
            <v-col cols="4" class="row-details">
              <Select label="Role" :items="baseRoles" />
            </v-col>
          </v-row>
        </div>
        <div id="advisers" class="mt-8">
          <div class="d-flex mb-8">
            <h6>Adviser</h6>
            <v-spacer></v-spacer>
            <Button text @click="inviteAdviserModal = true"
              >Invite Adviser</Button
            >
          </div>
          <v-row v-for="(adviser, index) in team.advisers" :key="index">
            <v-col cols="8" class="row-details">
              <TextField
                :label="adviser.email"
                placeholder="Member 1"
                :disabled="true"
              />
            </v-col>
            <v-col cols="4" class="row-details">
              <Button
                text
                class="error--text"
                @click="showRemoveAdviserModal(adviser)"
              >
                Remove Adviser
              </Button>
            </v-col>
          </v-row>
        </div>
        <div cols="12" class="d-flex mt-15">
          <Button text class="error--text" @click="leaveTeamModal = true"
            >Leave Team</Button
          >
          <v-spacer></v-spacer>
          <Button>Save Changes</Button>
        </div>
      </div>
    </v-form>
    <ModalLeaveTeam
      :team="team"
      :dialog-props="leaveTeamModal"
      :is-loading="isleavingTeamModal"
      @dialogClose="leaveTeamModal = $event"
      @dialogLeaveTeam="leaveTeam"
    />
    <ModalRemoveAdviser
      :adviser="selectedAdviser"
      :dialog-props="removeAdviserModal"
      :is-loading="isRemovingAdviserModal"
      @dialogClose="removeAdviserModal = $event"
      @dialogRemoveAdviser="removeAdviser"
    />
    <ModalInviteAdviser
      :dialog-props="inviteAdviserModal"
      :is-loading="isInvitingAdviserModal"
      @dialogClose="inviteAdviserModal = $event"
      @dialogInviteAdviser="inviteAdviser"
    />
    <ModalInviteMember
      :dialog-props="inviteMemberModal"
      :is-loading="isInvitingMemberModal"
      @dialogClose="inviteMemberModal = $event"
      @dialogInviteMmember="inviteMember"
    />
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import Select from "@/components/global/Select.vue";
import ModalLeaveTeam from "@/components/ModalLeaveTeam.vue";
import ModalRemoveAdviser from "@/components/ModalRemoveAdviser.vue";
import ModalInviteAdviser from "@/components/ModalInviteAdviser.vue";
import ModalInviteMember from "@/components/ModalInviteMember.vue";

export default {
  name: "TeamSettings",
  components: {
    TextField,
    Button,
    Select,
    ModalLeaveTeam,
    ModalRemoveAdviser,
    ModalInviteAdviser,
    ModalInviteMember,
  },
  data() {
    return {
      leaveTeamModal: false,
      isleavingTeamModal: false,
      selectedAdviser: {},
      removeAdviserModal: false,
      isRemovingAdviserModal: false,
      inviteAdviserModal: false,
      isInvitingAdviserModal: false,
      inviteMemberModal: false,
      isInvitingMemberModal: false,
      baseRoles: [],
      team: {
        name: "Cary and Co.",
        members: [
          {
            id: 1,
            email: "member1.member1@cit.edu",
            baseRole: "leader",
          },
          {
            id: 2,
            email: "member2.member2@cit.edu",
            baseRole: "leader",
          },
          {
            id: 3,
            email: "member3.member3@cit.edu",
            baseRole: "leader",
          },
        ],
        advisers: [
          {
            id: 1,
            email: "adviser1.adviser1@cit.edu",
            baseRole: "teacher",
            firstName: "Cheryl",
            lastName: "Pantaleon",
          },
          {
            id: 2,
            email: "adviser2.adviser2@cit.edu",
            baseRole: "teacher",
            firstName: "Leah",
            lastName: "Barbaso",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    showRemoveAdviserModal(adviser) {
      this.removeAdviserModal = true;
      this.selectedAdviser = adviser;
    },
    leaveTeam() {
      console.log("Leave Team");
    },
    removeAdviser() {
      console.log("Remove Adviser");
    },
    inviteAdviser() {
      console.log("Invite Adviser");
    },
    inviteMember() {
      console.log("Invite Member");
    },
  },
};
</script>

<style lang="scss" scoped>
.row-details {
  margin: 0 !important;
  padding: 0 0 0 12px !important;
}
</style>
