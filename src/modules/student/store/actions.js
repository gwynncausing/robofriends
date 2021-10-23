import { STUDENT_ACTIONS } from "./types/actions";
import { STUDENT_MUTATIONS } from "./types/mutations";
import { STUDENT_PAYLOADS } from "./types/payloads";
import Repository from "../repositories/repository-factory";
const TeamRepository = Repository.get("team");

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
};
