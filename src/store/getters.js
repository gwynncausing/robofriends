import { GETTERS } from "./types/getters";

export default {
  [GETTERS.GET_USER]({ user }) {
    return user;
  },
  [GETTERS.GET_TOKEN_ACCESS]({ tokens }) {
    return tokens.access;
  },
  [GETTERS.GET_TOKEN_REFRESH]({ tokens }) {
    return tokens.refresh;
  },
  [GETTERS.GET_IS_LOGGED_IN]({ isLoggedIn }) {
    return isLoggedIn;
  },
  [GETTERS.GET_USER_TYPE]({ userType }) {
    return userType;
  },
};
