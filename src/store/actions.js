import { ROOT_ACTIONS, ROOT_MUTATIONS, ROOT_PAYLOADS } from "./types";
import { STUDENT_MUTATIONS } from "@/modules/student/store/types";
import { ADVISER_MUTATIONS } from "@/modules/adviser/store/types";
import { MODULES } from "@/utils/constants";
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
    const { user, token } = response.data;
    commit(ROOT_MUTATIONS.SET_USER, { user: user });
    commit(ROOT_MUTATIONS.SET_TOKEN_ACCESS, { access: token.access });
    commit(ROOT_MUTATIONS.SET_TOKEN_REFRESH, { refresh: token.refresh });
    commit(ROOT_MUTATIONS.SET_USER_TYPE, { type: user.type });
    commit(ROOT_MUTATIONS.SET_IS_LOGGED_IN, { isLoggedIn: true });
  },

  async [ROOT_ACTIONS.SIGNUP_USER](
    { commit },
    payload = ROOT_PAYLOADS.SIGNUP_USER
  ) {
    const response = await UserRepository.create(payload);
    const { user, token } = response.data;
    commit(ROOT_MUTATIONS.SET_USER, { user: user });
    commit(ROOT_MUTATIONS.SET_TOKEN_ACCESS, { access: token.access });
    commit(ROOT_MUTATIONS.SET_TOKEN_REFRESH, { refresh: token.refresh });
    commit(ROOT_MUTATIONS.SET_IS_LOGGED_IN, { isLoggedIn: true });
  },

  async [ROOT_ACTIONS.GET_USER_INFO](
    { commit },
    payload = ROOT_PAYLOADS.GET_USER_INFO
  ) {
    const { id } = payload;
    const response = await UserRepository.getUser(id);
    const user = response.data;
    commit(ROOT_MUTATIONS.SET_USER, { user: user });
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

  async [ROOT_ACTIONS.UPDATE_USER](
    { commit },
    payload = ROOT_PAYLOADS.UPDATE_USER
  ) {
    const { id, user } = payload;
    const response = await UserRepository.update(user, id);
    const updatedUser = response.data;
    commit(ROOT_MUTATIONS.SET_USER, { user: updatedUser });
  },

  async [ROOT_ACTIONS.CHANGE_PASSWORD](
    context,
    payload = ROOT_PAYLOADS.CHANGE_PASSWORD
  ) {
    const { id, passwords } = payload;
    await UserRepository.changePassword(passwords, id);
  },

  async [ROOT_ACTIONS.FETCH_SCHOOLS]({ commit }) {
    const response = await SchoolRepository.get();
    const schools = response.data;
    commit(ROOT_MUTATIONS.SET_SCHOOLS, { schools: schools });
  },

  async [ROOT_ACTIONS.LOGOUT_USER]({ commit }) {
    commit(
      `${MODULES.STUDENT_MODULE_PATH}${STUDENT_MUTATIONS.SET_RESET_STUDENT_STATE}`
    );
    commit(
      `${MODULES.ADVISER_MODULE_PATH}${ADVISER_MUTATIONS.SET_RESET_ADVISER_STATE}`
    );
    commit(ROOT_MUTATIONS.SET_RESET_ROOT_STATE);
  },

  async [ROOT_ACTIONS.SEND_PASSWORD_RESET_LINK](
    context,
    payload = ROOT_PAYLOADS.SEND_PASSWORD_RESET_LINK
  ) {
    await UserRepository.sendResetLink(payload);
  },

  async [ROOT_ACTIONS.RESET_PASSWORD](
    context,
    payload = ROOT_PAYLOADS.RESET_PASSWORD
  ) {
    console.log(payload);
    await UserRepository.resetPassword(payload);
  },
};
