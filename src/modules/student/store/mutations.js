import { STUDENT_MUTATIONS, studentInitialState } from "./types";

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

  [STUDENT_MUTATIONS.SET_SELECTED_TEAM_DETAILS](
    state,
    { selectedTeamDetails }
  ) {
    state.selectedTeamDetails = selectedTeamDetails;
  },

  [STUDENT_MUTATIONS.SET_SUBMITTED_PROPOSALS](state, { submittedProposals }) {
    state.submittedProposals = submittedProposals;
  },

  [STUDENT_MUTATIONS.SET_SELECTED_PROPOSAL](state, { selectedProposal }) {
    state.selectedProposal = selectedProposal;
  },

  [STUDENT_MUTATIONS.SET_APPROVED_PROPOSAL](state, { approvedProposal }) {
    state.approvedProposal = approvedProposal;
  },

  [STUDENT_MUTATIONS.SET_APPROVED_PROPOSAL_DETAILS](
    state,
    { approvedProposalDetails }
  ) {
    state.approvedProposalDetails = approvedProposalDetails;
  },

  [STUDENT_MUTATIONS.SET_REVISED_PROPOSAL](state, { revisedProposal }) {
    state.revisedProposal = revisedProposal;
  },

  [STUDENT_MUTATIONS.SET_RESET_STUDENT_STATE](state) {
    Object.assign(state, {}, studentInitialState());
  },
};
