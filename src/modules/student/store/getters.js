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

  [STUDENT_GETTERS.GET_SUBMITTED_PROPOSALS]({ submittedProposals }) {
    return submittedProposals;
  },

  [STUDENT_GETTERS.GET_SELECTED_PROPOSAL]({ selectedProposal }) {
    return selectedProposal;
  },

  [STUDENT_GETTERS.GET_APPROVED_PROPOSAL]({ approvedProposal }) {
    return approvedProposal;
  },

  [STUDENT_GETTERS.GET_APPROVED_PROPOSAL_DETAILS]({ approvedProposalDetails }) {
    return approvedProposalDetails;
  },

  [STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS]({ selectedTeamDetails }) {
    return selectedTeamDetails;
  },
};
