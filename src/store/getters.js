import { ROOT_GETTERS } from "./types";

export default {
  [ROOT_GETTERS.GET_USER]({ user }) {
    return user;
  },

  [ROOT_GETTERS.GET_USER_META]({ userMeta }) {
    return userMeta;
  },

  [ROOT_GETTERS.GET_TOKEN_ACCESS]({ tokens }) {
    return tokens.access;
  },

  [ROOT_GETTERS.GET_TOKEN_REFRESH]({ tokens }) {
    return tokens.refresh;
  },

  [ROOT_GETTERS.GET_IS_LOGGED_IN]({ isLoggedIn }) {
    return isLoggedIn;
  },

  [ROOT_GETTERS.GET_USER_TYPE]({ userType }) {
    return userType;
  },

  [ROOT_GETTERS.GET_SCHOOLS]({ schools }) {
    return schools;
  },

  [ROOT_GETTERS.GET_CURRENT_SCHOOL]({ currentSchool }) {
    return currentSchool;
  },
  [ROOT_GETTERS.GET_ARCHIVES]({ archives }) {
    return archives;
  },
};
