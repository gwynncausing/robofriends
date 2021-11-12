import { STUDENT_GETTERS } from "./types";

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
<<<<<<< HEAD
  [STUDENT_GETTERS.GET_SELECTED_TEAM]({ selectedTeam }) {
    return selectedTeam;
=======

  [STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS]({ selectedTeamDetails }) {
    return selectedTeamDetails;
>>>>>>> feature/tiptap
  },
};
