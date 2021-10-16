import { ACTIONS } from "./types/actions";
import { MUTATIONS } from "./types/mutations";
import { PAYLOADS } from "./types/payloads";
import Repository from "@/repositories/repository-factory";
const AuthRepository = Repository.get("auth");
const UserRepository = Repository.get("user");
const SchoolRepository = Repository.get("school");

export default {
  async [ACTIONS.LOGIN_USER]({ commit }, payload = PAYLOADS.LOG_IN_USER) {
    const response = await AuthRepository.login(payload);
    const { user, access_token, refresh_token } = response.data;
    commit(MUTATIONS.SET_USER, { user: user });
    commit(MUTATIONS.SET_TOKEN_ACCESS, { access: access_token });
    commit(MUTATIONS.SET_TOKEN_REFRESH, { refresh: refresh_token });
    commit(MUTATIONS.SET_USER_TYPE, { type: user.type });
    commit(MUTATIONS.SET_IS_LOGGED_IN, { isLoggedIn: true });
  },
  async [ACTIONS.SIGNUP_USER]({ commit }, payload = PAYLOADS.SIGNUP_USER) {
    const response = await UserRepository.create(payload);
    const { user, tokens } = response.data;
    commit(MUTATIONS.SET_USER, { user: user });
    commit(MUTATIONS.SET_TOKEN_ACCESS, { access: tokens.access });
    commit(MUTATIONS.SET_TOKEN_REFRESH, { refresh: tokens.refresh });
  },
  async [ACTIONS.ONBOARD_USER]({ commit }, payload = PAYLOADS.ONBOARD_USER) {
    const { id, user } = payload;
    const response = await UserRepository.update(user, id);
    const updatedUser = response.data;
    commit(MUTATIONS.SET_USER, { user: updatedUser });
    commit(MUTATIONS.SET_USER_TYPE, { type: updatedUser.type });
  },
  async [ACTIONS.FETCH_SCHOOLS]({ commit }) {
    const response = await SchoolRepository.get();
    const schools = response.data;
    commit(MUTATIONS.SET_SCHOOLS, { schools: schools });
  },
};
