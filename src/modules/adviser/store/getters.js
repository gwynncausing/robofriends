import { ADVISER_GETTERS } from "./types";

export default {
  [ADVISER_GETTERS.GET_INVITATIONS]({ invitations }) {
    return invitations;
  },
  [ADVISER_GETTERS.GET_MEMBERSHIPS]({ memberships }) {
    return memberships;
  },
  [ADVISER_GETTERS.GET_HAS_MEMBERSHIPS](state) {
    return state.hasMemberships;
  },
};
