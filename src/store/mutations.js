import { MUTATIONS } from "./types/mutations";

export default {
  [MUTATIONS.SET_USER](state, { user }) {
    console.log("User Mutation", user);
    state.user = user;
  },
  [MUTATIONS.SET_TOKEN_ACCESS](state, { access }) {
    state.tokens.access = access;
  },
  [MUTATIONS.SET_TOKEN_REFRESH](state, { refresh }) {
    state.tokens.refresh = refresh;
  },
  [MUTATIONS.SET_IS_LOGGED_IN](state, { isLoggedIn }) {
    state.isLoggedIn = isLoggedIn;
  },
  [MUTATIONS.SET_USER_TYPE](state, { type }) {
    state.userType = type;
  },
};
