import { ACTIONS } from "./types/actions";
import { MUTATIONS } from "./types/mutations";
import { PAYLOADS } from "./types/payloads";
import Repository from "../repositories/repository-factory";
const TeamRepository = Repository.get("team");

export default {
  async [ACTIONS.CREATE_TEAM]({ commit }, payload = PAYLOADS.CREATE_TEAM) {
    const response = await TeamRepository.create(payload);
    const team = response.data;
    commit(MUTATIONS.SET_CURRENT_CREATED_TEAM, { team: team });
  },
  async [ACTIONS.SEND_MEMBERS_INVITATIONS](
    { commit },
    payload = PAYLOADS.SEND_TEAM_INVITATIONS
  ) {
    const { id, emails } = payload;
    const response = await TeamRepository.invite(emails, id);
    const sentMembersInvitations = response.data;
    commit(MUTATIONS.SET_SENT_MEMBERS_INVITATIONS, {
      sentMembersInvitations: sentMembersInvitations,
    });
  },
  async [ACTIONS.SEND_TEACHERS_INVITATIONS](
    { commit },
    payload = PAYLOADS.SEND_TEAM_INVITATIONS
  ) {
    const { id, emails } = payload;
    const response = await TeamRepository.invite(emails, id);
    const sentTeachersInvitations = response.data;
    commit(MUTATIONS.SET_SENT_TEACHERS_INVITATIONS, {
      sentTeachersInvitations: sentTeachersInvitations,
    });
  },
};
