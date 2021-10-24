import { ROOT_GETTERS } from "./types/getters";

export default {
  [ROOT_GETTERS.GET_USER]({ user }) {
    return user;
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
};
