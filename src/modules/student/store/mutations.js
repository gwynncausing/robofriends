import { MUTATIONS } from "./types/mutations";

export default {
  [MUTATIONS.SET_CURRENT_CREATED_TEAM](state, { team }) {
    state.currentCreatedTeam = team;
  },
  [MUTATIONS.SET_SENT_MEMBERS_INVITATIONS](state, { sentMembersInvitations }) {
    state.sentMembersInvitations = sentMembersInvitations;
  },
  [MUTATIONS.SET_SENT_TEACHERS_INVITATIONS](
    state,
    { sentTeachersInvitations }
  ) {
    state.sentTeachersInvitations = sentTeachersInvitations;
  },
  [MUTATIONS.SET_INVITATIONS](state, { invitations }) {
    state.invitations = invitations;
  },
};
