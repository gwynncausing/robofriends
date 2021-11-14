import { ADVISER_MUTATIONS, adviserInitialState } from "./types";

export default {
  [ADVISER_MUTATIONS.SET_INVITATIONS](state, { invitations }) {
    state.invitations = invitations;
  },
  [ADVISER_MUTATIONS.SET_UPDATE_INVITATION](state, { invitation }) {
    const invitations = state.invitations;
    const index = invitations.findIndex(
      (_invitation) => _invitation.id === invitation.id
    );
    invitations[index] = invitation;
    state.invitations = Object.assign([], invitations);
  },
  [ADVISER_MUTATIONS.SET_MEMBERSHIPS](state, { memberships }) {
    state.memberships = memberships;
  },
  [ADVISER_MUTATIONS.SET_HAS_MEMBERSHIPS](state, { hasMemberships }) {
    state.hasMemberships = hasMemberships;
  },
  [ADVISER_MUTATIONS.SET_RESET_ADVISER_STATE](state) {
    Object.assign(state, {}, adviserInitialState());
  },
  [ADVISER_MUTATIONS.ADD_TEAM](state, { team }) {
    let index = state.teams.findIndex((_team) => _team.id === team.id);
    if (index === -1) state.teams.push(team);
    state.teams[index] = team;
  },
  [ADVISER_MUTATIONS.ADD_PENDING_PROPOSAL](state, { proposals, id }) {
    let index = state.teams.findIndex((_team) => _team.id === id);
    state.teams[index].proposals = { pending: proposals };
  },
  [ADVISER_MUTATIONS.UPDATE_ONE_PENDING_PROPOSAL](
    state,
    { proposal, proposalId, teamId }
  ) {
    let teamIndex = state.teams.findIndex((_team) => _team.id === teamId);
    let proposalIndex = state.teams[teamIndex].proposals.pending.findIndex(
      (_proposal) => _proposal.id === proposalId
    );
    state.teams[teamIndex].proposals.pending[proposalIndex] = proposal;
  },
};
