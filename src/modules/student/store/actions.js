import { STUDENT_ACTIONS, STUDENT_MUTATIONS, STUDENT_PAYLOADS } from "./types";
import Repository from "../repositories/repository-factory";
import { PROPOSAL } from "@/utils/constants";
const TeamRepository = Repository.get("team");
const ProposalRepository = Repository.get("proposal");

export default {
  async [STUDENT_ACTIONS.CREATE_TEAM](
    { commit },
    payload = STUDENT_PAYLOADS.CREATE_TEAM
  ) {
    const response = await TeamRepository.create(payload);
    const team = response.data;
    commit(STUDENT_MUTATIONS.SET_CURRENT_CREATED_TEAM, { team: team });
  },

  async [STUDENT_ACTIONS.SEND_MEMBERS_INVITATIONS](
    { commit },
    payload = STUDENT_PAYLOADS.SEND_TEAM_INVITATIONS
  ) {
    const { id, emails } = payload;
    const response = await TeamRepository.invite(emails, id);
    const sentMembersInvitations = response.data;
    commit(STUDENT_MUTATIONS.SET_SENT_MEMBERS_INVITATIONS, {
      sentMembersInvitations: sentMembersInvitations,
    });
  },

  async [STUDENT_ACTIONS.SEND_TEACHERS_INVITATIONS](
    { commit },
    payload = STUDENT_PAYLOADS.SEND_TEAM_INVITATIONS
  ) {
    const { id, emails } = payload;
    const response = await TeamRepository.invite(emails, id);
    const sentTeachersInvitations = response.data;
    commit(STUDENT_MUTATIONS.SET_SENT_TEACHERS_INVITATIONS, {
      sentTeachersInvitations: sentTeachersInvitations,
    });
  },

  async [STUDENT_ACTIONS.FETCH_INVITATIONS]({ commit }) {
    const response = await TeamRepository.getInvitations();
    const invitations = response.data;
    commit(STUDENT_MUTATIONS.SET_INVITATIONS, { invitations: invitations });
  },

  async [STUDENT_ACTIONS.UPDATE_INVITATION](
    { commit },
    payload = STUDENT_PAYLOADS.UPDATE_INVITATION
  ) {
    const { id, invitation } = payload;
    const response = await TeamRepository.updateInvite(invitation, id);
    const updatedInvitation = response.data;
    commit(STUDENT_MUTATIONS.SET_UPDATE_INVITATION, {
      invitation: updatedInvitation,
    });
  },

  async [STUDENT_ACTIONS.FETCH_MEMBERSHIPS]({ commit }) {
    const response = await TeamRepository.getMemberships();
    const memberships = response.data;
    commit(STUDENT_MUTATIONS.SET_MEMBERSHIPS, { memberships: memberships });
    commit(STUDENT_MUTATIONS.SET_HAS_MEMBERSHIPS, {
      hasMemberships: memberships.length !== 0 ? true : false,
    });
  },

  async [STUDENT_ACTIONS.JOIN_CODE_TEAM](
    { commit },
    payload = STUDENT_PAYLOADS.JOIN_CODE_TEAM_PAYLOAD
  ) {
    const response = await TeamRepository.joinTeam(payload);
    console.log(response);
    console.log(commit);
  },

  async [STUDENT_ACTIONS.FETCH_SELECTED_TEAM_DETAILS]({ commit }, { id }) {
    const response = await TeamRepository.getTeam(id);
    const selectedTeamDetails = response.data;
    commit(STUDENT_MUTATIONS.SET_SELECTED_TEAM_DETAILS, {
      selectedTeamDetails: selectedTeamDetails,
    });
  },

  async [STUDENT_ACTIONS.UPDATE_SELECTED_TEAM_DETAILS](
    { commit },
    payload = STUDENT_PAYLOADS.UPDATE_SELECTED_TEAM_DETAILS
  ) {
    const { id, team } = payload;
    const response = await TeamRepository.update(team, id);
    const teamDetails = response.data;
    commit(STUDENT_MUTATIONS.SET_SELECTED_TEAM_DETAILS, {
      selectedTeamDetails: teamDetails,
    });
  },

  async [STUDENT_ACTIONS.UPDATE_MEMBERSHIPS](
    context,
    payload = STUDENT_PAYLOADS.UPDATE_MEMBERSHIPS
  ) {
    const { membership, id } = payload;
    await TeamRepository.updateMemberships(membership, id);
  },

  async [STUDENT_ACTIONS.CREATE_PROPOSAL](
    context,
    payload = STUDENT_PAYLOADS.CREATE_PROPOSAL
  ) {
    const { id, proposal } = payload;
    await ProposalRepository.create(proposal, id);
  },

  async [STUDENT_ACTIONS.FETCH_SUBMITTED_PROPOSALS]({ commit }, { id }) {
    const response = await ProposalRepository.getProposalsByTeam(id);
    const proposals = response.data;
    commit(STUDENT_MUTATIONS.SET_SUBMITTED_PROPOSALS, {
      submittedProposals: proposals,
    });
  },

  async [STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL]({ commit }, { id }) {
    const response = await ProposalRepository.getProposalsByStatus(
      PROPOSAL.STATUS.APPROVED,
      id
    );
    const proposal = response.data?.[0] ?? {};
    commit(STUDENT_MUTATIONS.SET_APPROVED_PROPOSAL, {
      approvedProposal: proposal,
    });
  },

  async [STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL_DETAILS]({ commit }, { id }) {
    const response = await ProposalRepository.getProposal(id);
    const proposal = response.data;
    commit(STUDENT_MUTATIONS.SET_APPROVED_PROPOSAL_DETAILS, {
      approvedProposalDetails: proposal,
    });
  },

  async [STUDENT_ACTIONS.FETCH_SELECTED_PROPOSAL]({ commit }, { id }) {
    const response = await ProposalRepository.getProposal(id);
    const proposal = response.data;
    commit(STUDENT_MUTATIONS.SET_SELECTED_PROPOSAL, {
      selectedProposal: proposal,
    });
  },
};
