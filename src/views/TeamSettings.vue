<template>
  <div id="account-settings" class="d-flex justify-center">
    <v-form
      ref="settings-form"
      lazy-validation
      @submit.prevent="finishOnboarding()"
    >
      <div id="account-settings-wrapper" class="mt-6">
        <header>
          <h5 class="tertiary--text">{{ getSelectedTeam.name }} Settings</h5>
        </header>
        <div id="members" class="mt-md-8 mt-12">
          <div class="d-flex mb-8">
            <h6>Team Code</h6>
            <v-spacer></v-spacer>
            <span class="neutral-600--text">{{ getSelectedTeam.code }}</span>
          </div>
          <div class="d-flex mb-8">
            <h6>Members</h6>
            <v-spacer></v-spacer>
            <Button text @click="inviteMemberModal = true"
              >Invite Member</Button
            >
          </div>
          <v-row
            v-for="(member, index) in team.members"
            :key="index"
            class="mt-7 mt-md-3"
          >
            <v-col cols="12" md="8" class="row-details">
              <TextField
                :label="member.email"
                placeholder="Member 1"
                :disabled="true"
              />
            </v-col>
            <v-col cols="7" sm="6" md="4" class="row-details">
              <Select label="Role" :items="baseRoles" />
            </v-col>
          </v-row>
        </div>
        <div id="advisers" class="mt-md-8 mt-12">
          <div class="d-flex mb-8">
            <h6>Adviser</h6>
            <v-spacer></v-spacer>
            <Button text @click="inviteAdviserModal = true"
              >Invite Adviser</Button
            >
          </div>
          <v-row v-for="(adviser, index) in team.advisers" :key="index">
            <v-col cols="10" md="8" class="row-details">
              <TextField
                :label="adviser.email"
                placeholder="Member 1"
                :disabled="true"
              />
            </v-col>
            <v-col cols="2" md="4" class="row-details">
              <Button
                text
                class="error--text d-none d-md-flex"
                @click="removeAdviserModal = true"
              >
                Remove Adviser
              </Button>
              <Button
                class="btn-remove-item d-md-none"
                icon
                @click="removeAdviserModal = true"
              >
                <v-icon color="error">mdi-close</v-icon>
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

import { mapActions, mapGetters } from "vuex";
import {
  STUDENT_ACTIONS,
  STUDENT_GETTERS,
} from "@/modules/student/store/types";
import { MODULES } from "@/utils/constants";

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
      baseRoles: ["Member", "Leader"],
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
  computed: {
    ...mapGetters({
      getSelectedTeam: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM}`,
    }),
  },
  methods: {
    ...mapActions({
      onSendMembersInvitations: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.SEND_MEMBERS_INVITATIONS}`,
      onSendTeachersInvitations: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.SEND_TEACHERS_INVITATIONS}`,
    }),
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
    async inviteAdviser(payload) {
      const { email } = payload;
      console.log("Invite Adviser");
      try {
        const invitedTeachersPayload = {
          id: this.getCurrentCreatedTeam.id,
          emails: {
            invitedEmails: [email],
            baseRole: "adviser",
          },
        };
        await this.onSendTeachersInvitations(invitedTeachersPayload);
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmit = false;
      }
    },
    inviteMember() {
      console.log("Invite Member");
    },
  },
};
</script>

<style lang="scss" scoped>
#account-settings {
  margin-bottom: 100px;
  .row-details {
    margin: 0 !important;
    padding: 0 0 0 12px !important;
  }
}
</style>
