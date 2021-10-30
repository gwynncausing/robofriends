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
};
