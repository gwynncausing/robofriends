import { GETTERS } from "./types/getters";

export default {
  [GETTERS.GET_CURRENT_CREATED_TEAM]({ currentCreatedTeam }) {
    return currentCreatedTeam;
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
  [GETTERS.GET_MEMBERSHIPS]({ memberships }) {
    return memberships;
  },
  [GETTERS.GET_HAS_MEMBERSHIPS]({ hasMemberships }) {
    return hasMemberships;
  },
};
