import { GETTERS } from "./types/getters";

export default {
  [GETTERS.GET_TEAM]({ team }) {
    return team;
  },
  [GETTERS.GET_SENT_MEMBERS_INVITATIONS]({ sentMembersInvitations }) {
    return sentMembersInvitations;
  },
  [GETTERS.GET_SENT_TEACHERS_INVITATIONS]({ sentTeachersInvitations }) {
    return sentTeachersInvitations;
  },
  [GETTERS.GET_INVITATIONS]({ invitations }) {
    return invitations;
  },
};
