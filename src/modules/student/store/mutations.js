import { STUDENT_MUTATIONS } from "./types/mutations";

export default {
  [STUDENT_MUTATIONS.SET_CURRENT_CREATED_TEAM](state, { team }) {
    state.currentCreatedTeam = team;
  },
  [STUDENT_MUTATIONS.SET_SENT_MEMBERS_INVITATIONS](
    state,
    { sentMembersInvitations }
  ) {
    state.sentMembersInvitations = sentMembersInvitations;
  },
  [STUDENT_MUTATIONS.SET_SENT_TEACHERS_INVITATIONS](
    state,
    { sentTeachersInvitations }
  ) {
    state.sentTeachersInvitations = sentTeachersInvitations;
  },
  [STUDENT_MUTATIONS.SET_INVITATIONS](state, { invitations }) {
    state.invitations = invitations;
  },
  [STUDENT_MUTATIONS.SET_UPDATE_INVITATION](state, { invitation }) {
    const invitations = state.invitations;
    const index = invitations.findIndex(
      (_invitation) => _invitation.id === invitation.id
    );
    invitations[index] = invitation;
    state.invitations = Object.assign([], invitations);
  },
  [STUDENT_MUTATIONS.SET_MEMBERSHIPS](state, { memberships }) {
    state.memberships = memberships;
  },
  [STUDENT_MUTATIONS.SET_HAS_MEMBERSHIPS](state, { hasMemberships }) {
    state.hasMemberships = hasMemberships;
  },
  [STUDENT_MUTATIONS.SET_SELECTED_TEAM](state, { selectedTeam }) {
    state.selectedTeam = selectedTeam;
  },
};
