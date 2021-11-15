import { ADVISER_ACTIONS, ADVISER_MUTATIONS, ADVISER_PAYLOADS } from "./types";
import Repository from "../repositories/repository-factory";
import { PROPOSAL } from "@/utils/constants";
const TeamRepository = Repository.get("team");
const ProposalRepository = Repository.get("proposals");

export default {
  async [ADVISER_ACTIONS.FETCH_INVITATIONS]({ commit }) {
    const response = await TeamRepository.getInvitations();
    const invitations = response.data;
    commit(ADVISER_MUTATIONS.SET_INVITATIONS, { invitations: invitations });
  },
  async [ADVISER_ACTIONS.UPDATE_INVITATION](
    { commit },
    payload = ADVISER_PAYLOADS.UPDATE_INVITATION
  ) {
    const { id, invitation } = payload;
    const response = await TeamRepository.updateInvite(invitation, id);
    const updatedInvitation = response.data;
    commit(ADVISER_MUTATIONS.SET_UPDATE_INVITATION, {
      invitation: updatedInvitation,
    });
  },
  async [ADVISER_ACTIONS.FETCH_MEMBERSHIPS]({ commit }) {
    const response = await TeamRepository.getMemberships();
    const memberships = response.data;
    commit(ADVISER_MUTATIONS.SET_MEMBERSHIPS, { memberships: memberships });
    commit(ADVISER_MUTATIONS.SET_HAS_MEMBERSHIPS, {
      hasMemberships: memberships.length !== 0 ? true : false,
    });
  },
  async [ADVISER_ACTIONS.FETCH_TEAM](
    { commit },
    payload = ADVISER_PAYLOADS.FETCH_TEAM
  ) {
    const { id } = payload;
    const response = await TeamRepository.getTeam(id);
    const team = response.data;
    commit(ADVISER_MUTATIONS.ADD_TEAM, { team: team });
  },

  async [ADVISER_ACTIONS.FETCH_PENDING_PROPOSALS](
    { commit },
    payload = ADVISER_PAYLOADS.FETCH_PENDING_PROPOSALS
  ) {
    const { id } = payload;
    const response = await ProposalRepository.getProposalsByStatus(
      PROPOSAL.STATUS.PENDING,
      id
    );
    const proposals = response.data;
    commit(ADVISER_MUTATIONS.ADD_PENDING_PROPOSAL, {
      proposals: proposals,
      id: id,
    });
  },

  async [ADVISER_ACTIONS.FETCH_APPROVED_PROPOSAL](
    { commit },
    payload = ADVISER_PAYLOADS.FETCH_APPROVED_PROPOSAL
  ) {
    const { id } = payload;
    const response = await ProposalRepository.getProposalsByStatus(
      PROPOSAL.STATUS.APPROVED,
      id
    );
    const proposals = response.data;
    commit(ADVISER_MUTATIONS.ADD_APPROVED_PROPOSAL, {
      proposals: proposals,
      teamId: id,
    });
  },

  async [ADVISER_ACTIONS.FETCH_ONE_PENDING_PROPOSAL](
    { commit },
    payload = ADVISER_PAYLOADS.FETCH_ONE_PENDING_PROPOSAL
  ) {
    const { proposalId, teamId } = payload;
    const response = await ProposalRepository.getProposal(proposalId);
    const proposal = response.data;
    commit(ADVISER_MUTATIONS.UPDATE_ONE_PENDING_PROPOSAL, {
      proposal: proposal,
      proposalId: proposalId,
      teamId: teamId,
    });
  },

  async [ADVISER_ACTIONS.FETCH_ONE_APPROVED_PROPOSAL](
    { commit },
    payload = ADVISER_PAYLOADS.FETCH_ONE_APPROVED_PROPOSAL
  ) {
    const { proposalId, teamId } = payload;
    const response = await ProposalRepository.getProposal(proposalId);
    const proposal = response.data;
    commit(ADVISER_MUTATIONS.UPDATE_ONE_APPROVED_PROPOSAL, {
      proposal: proposal,
      proposalId: proposalId,
      teamId: teamId,
    });
  },

  async [ADVISER_ACTIONS.UPDATE_PROPOSAL](
    { commit },
    payload = ADVISER_PAYLOADS.UPDATE_PROPOSAL
  ) {
    const { id, status, feedback, teamId } = payload;
    const _payload = {
      status: status,
      feedback: feedback,
    };
    const response = await ProposalRepository.update(_payload, id);
    const proposals = response.data;
    commit(ADVISER_MUTATIONS.ADD_APPROVED_PROPOSAL, {
      proposals: proposals,
      teamId: teamId,
    });
  },
};
