import { ROOT_ACTIONS } from "./types/actions";
import { ROOT_MUTATIONS } from "./types/mutations";
import { ROOT_PAYLOADS } from "./types/payloads";
import Repository from "@/repositories/repository-factory";
const AuthRepository = Repository.get("auth");
const UserRepository = Repository.get("user");
const SchoolRepository = Repository.get("school");

export default {
  async [ROOT_ACTIONS.LOGIN_USER](
    { commit },
    payload = ROOT_PAYLOADS.LOG_IN_USER
  ) {
    const response = await AuthRepository.login(payload);
    const { user, access_token, refresh_token } = response.data;
    commit(ROOT_MUTATIONS.SET_USER, { user: user });
    commit(ROOT_MUTATIONS.SET_TOKEN_ACCESS, { access: access_token });
    commit(ROOT_MUTATIONS.SET_TOKEN_REFRESH, { refresh: refresh_token });
    commit(ROOT_MUTATIONS.SET_USER_TYPE, { type: user.type });
    commit(ROOT_MUTATIONS.SET_IS_LOGGED_IN, { isLoggedIn: true });
  },
  async [ROOT_ACTIONS.SIGNUP_USER](
    { commit },
    payload = ROOT_PAYLOADS.SIGNUP_USER
  ) {
    const response = await UserRepository.create(payload);
    const { user, tokens } = response.data;
    commit(ROOT_MUTATIONS.SET_USER, { user: user });
    commit(ROOT_MUTATIONS.SET_TOKEN_ACCESS, { access: tokens.access_token });
    commit(ROOT_MUTATIONS.SET_TOKEN_REFRESH, { refresh: tokens.refresh_token });
  },
  async [ROOT_ACTIONS.ONBOARD_USER](
    { commit },
    payload = ROOT_PAYLOADS.ONBOARD_USER
  ) {
    const { id, user } = payload;
    const response = await UserRepository.update(user, id);
    const updatedUser = response.data;
    commit(ROOT_MUTATIONS.SET_USER, { user: updatedUser });
    commit(ROOT_MUTATIONS.SET_USER_TYPE, { type: updatedUser.type });
  },
  async [ROOT_ACTIONS.FETCH_SCHOOLS]({ commit }) {
    const response = await SchoolRepository.get();
    const schools = response.data;
    commit(ROOT_MUTATIONS.SET_SCHOOLS, { schools: schools });
  },
};
