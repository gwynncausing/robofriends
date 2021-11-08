import { ADVISER_ACTIONS, ADVISER_MUTATIONS, ADVISER_PAYLOADS } from "./types";
import Repository from "../repositories/repository-factory";
const TeamRepository = Repository.get("team");

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
};
