import { ROOT_MUTATIONS } from "./types";
import { rootInititalState } from "./types";

export default {
  [ROOT_MUTATIONS.SET_USER](state, { user }) {
    state.user = user;
  },

  [ROOT_MUTATIONS.SET_USER_META](state, { userMeta }) {
    state.userMeta = userMeta;
  },

  [ROOT_MUTATIONS.SET_TOKEN_ACCESS](state, { access }) {
    state.tokens.access = access;
  },

  [ROOT_MUTATIONS.SET_TOKEN_REFRESH](state, { refresh }) {
    state.tokens.refresh = refresh;
  },

  [ROOT_MUTATIONS.SET_IS_LOGGED_IN](state, { isLoggedIn }) {
    state.isLoggedIn = isLoggedIn;
  },

  [ROOT_MUTATIONS.SET_USER_TYPE](state, { type }) {
    state.userType = type;
  },

  [ROOT_MUTATIONS.SET_SCHOOLS](state, { schools }) {
    state.schools = schools;
  },

  [ROOT_MUTATIONS.SET_RESET_ROOT_STATE](state) {
    Object.assign(state, {}, rootInititalState());
  },

  [ROOT_MUTATIONS.SET_CURRENT_SCHOOL](state, { school }) {
    state.currentSchool = school;
  },
  [ROOT_MUTATIONS.SET_ARCHIVES](state, { archives }) {
    state.archives = archives;
  },
  [ROOT_MUTATIONS.SET_ONE_ARCHIVE_RESEARCH](state, { archives }) {
    state.currentArchive = archives;
  },
};
