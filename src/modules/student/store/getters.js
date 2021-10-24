import { STUDENT_GETTERS } from "./types/getters";

export default {
  [STUDENT_GETTERS.GET_CURRENT_CREATED_TEAM]({ currentCreatedTeam }) {
    return currentCreatedTeam;
  },
  [STUDENT_GETTERS.GET_SENT_MEMBERS_INVITATIONS]({ sentMembersInvitations }) {
    return sentMembersInvitations;
  },
  [STUDENT_GETTERS.GET_SENT_TEACHERS_INVITATIONS]({ sentTeachersInvitations }) {
    return sentTeachersInvitations;
  },
  [STUDENT_GETTERS.GET_INVITATIONS]({ invitations }) {
    return invitations;
  },
  [STUDENT_GETTERS.GET_MEMBERSHIPS]({ memberships }) {
    return memberships;
  },
  [STUDENT_GETTERS.GET_HAS_MEMBERSHIPS]({ hasMemberships }) {
    return hasMemberships;
  },
};
