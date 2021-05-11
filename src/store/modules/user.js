/* References:
 *  [1] https://vuex.vuejs.org/
 *  [2] https://blog.logrocket.com/handling-authentication-in-your-graphql-powered-vue-app/
 *
 */

import { apolloProvider } from "@/vue-apollo";
// import REGISTER_USER from "@/graphql/mutations/register-user.gql";
// import LOGIN_USER from "@/graphql/mutations/login-user.gql";

const REGISTER_USER = "";
const LOGIN_USER = "";

const state = () => ({
  accessToken: localStorage.getItem("access-token") || null,
  refreshToken: localStorage.getItem("refresh-token") || null,
  authStatus: localStorage.getItem("auth-status") || false,
  userType: localStorage.getItem("user-type") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
});

const getters = {
  getAuthStatus(state) {
    return state.authStatus;
  },
  getAccessToken(state) {
    return state.accessToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
  getUserType(state) {
    return state.userType;
  },
  getUser(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return state.accessToken != null;
  },
};

const mutations = {
  setAuthStatus(state, authStatus) {
    state.authStatus = authStatus;
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  setUserType(state, userType) {
    state.userType = userType;
  },
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  async register(context, credentials) {
    try {
      const { data } = await apolloProvider.mutate({
        mutation: REGISTER_USER,
        variables: { ...credentials },
      });
      return data.register;
    } catch (error) {
      return error;
    }
  },
  async login({ commit }, credentials) {
    try {
      const { data } = await apolloProvider.mutate({
        mutation: LOGIN_USER,
        variables: { ...credentials },
      });
      const output = data.tokenAuth;
      const accessToken = `${output.token}`;
      const refreshToken = `${output.refreshToken}`;
      const authStatus = output.success;
      if (output.user != null) {
        const userType = output.user.userType;
        const user = output.user;
        commit("setAuthStatus", authStatus);
        commit("setAccessToken", accessToken);
        commit("setRefreshToken", refreshToken);
        commit("setUserType", userType);
        commit("setUser", user);
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("refresh-token", refreshToken);
        localStorage.setItem("auth-status", authStatus);
        localStorage.setItem("user-type", userType);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return data.tokenAuth;
    } catch (error) {
      return error;
    }
  },
  async logout({ commit }) {
    commit("setAuthStatus", null);
    commit("setAccessToken", null);
    commit("setRefreshToken", null);
    commit("setUserType", null);
    commit("setUser", null);
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("auth-status");
    localStorage.removeItem("user-type");
    localStorage.removeItem("user");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
