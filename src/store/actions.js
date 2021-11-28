import { ROOT_ACTIONS, ROOT_MUTATIONS, ROOT_PAYLOADS } from "./types";
import { STUDENT_MUTATIONS } from "@/modules/student/store/types";
import { ADVISER_MUTATIONS } from "@/modules/adviser/store/types";
import { MODULES, USER } from "@/utils/constants";
import Repository from "@/repositories/repository-factory";
const AuthRepository = Repository.get("auth");
const UserRepository = Repository.get("user");
const SchoolRepository = Repository.get("school");
const ArchiveRepository = Repository.get("research");

export default {
  async [ROOT_ACTIONS.LOGIN_USER](
    { commit },
    payload = ROOT_PAYLOADS.LOG_IN_USER
  ) {
    const response = await AuthRepository.login(payload);
    const { user, token } = response.data;
    // * start: To enable that only verified user can only login, remove/comment out these codes
    commit(ROOT_MUTATIONS.SET_USER, { user: user });
    commit(ROOT_MUTATIONS.SET_TOKEN_ACCESS, { access: token.access });
    commit(ROOT_MUTATIONS.SET_TOKEN_REFRESH, { refresh: token.refresh });
    commit(ROOT_MUTATIONS.SET_USER_TYPE, { type: user.type });
    commit(ROOT_MUTATIONS.SET_IS_LOGGED_IN, { isLoggedIn: true });
    commit(ROOT_MUTATIONS.SET_USER_META, {
      userMeta: { email: user.email, status: USER.STATUS.VERIFIED },
    });
    // * end:

    // * start: To enable that only verified user can only login, uncomment these codes
    // switch (user.verificationStatus) {
    //   case USER.STATUS.VERIFIED:
    //     commit(ROOT_MUTATIONS.SET_USER_META, {
    //       userMeta: { email: user.email, status: user.verificationStatus },
    //     });
    //     commit(ROOT_MUTATIONS.SET_USER, { user: user });
    //     commit(ROOT_MUTATIONS.SET_TOKEN_ACCESS, { access: token.access });
    //     commit(ROOT_MUTATIONS.SET_TOKEN_REFRESH, { refresh: token.refresh });
    //     commit(ROOT_MUTATIONS.SET_USER_TYPE, { type: user.type });
    //     commit(ROOT_MUTATIONS.SET_IS_LOGGED_IN, { isLoggedIn: true });
    //     break;
    //   case USER.STATUS.UNVERIFIED:
    //     commit(ROOT_MUTATIONS.SET_USER_META, {
    //       userMeta: { email: user.email, status: user.verificationStatus },
    //     });
    //     break;
    //   case USER.STATUS.BLOCK:
    //     commit(ROOT_MUTATIONS.SET_USER_META, {
    //       userMeta: { email: user.email, status: user.verificationStatus },
    //     });
    //     break;
    //   default:
    //     break;
    // }
    // * end:
  },

  async [ROOT_ACTIONS.SIGNUP_USER](
    context,
    payload = ROOT_PAYLOADS.SIGNUP_USER
  ) {
    await UserRepository.create(payload);
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
    await UserRepository.resetPassword(payload);
  },

  async [ROOT_ACTIONS.VERIFY_ACCOUNT](
    context,
    payload = ROOT_PAYLOADS.VERIFY_ACCOUNT
  ) {
    await UserRepository.verifyAccount(payload);
  },

  async [ROOT_ACTIONS.RESEND_VERIFICATION_LINK](
    context,
    payload = ROOT_PAYLOADS.RESEND_VERIFICATION_LINK
  ) {
    await UserRepository.sendVerificationLink(payload);
  },

  async [ROOT_ACTIONS.DELETE_USER](
    context,
    payload = ROOT_PAYLOADS.DELETE_USER
  ) {
    const { id } = payload;
    await UserRepository.delete(id);
  },

  async [ROOT_ACTIONS.FETCH_CURRENT_SCHOOL]({ commit }, { schoolId }) {
    const response = await SchoolRepository.getSchool(schoolId);
    const school = response.data;
    commit(ROOT_MUTATIONS.SET_CURRENT_SCHOOL, { school: school });
  },
  async [ROOT_ACTIONS.FETCH_ARCHIVES]({ commit }) {
    const response = await ArchiveRepository.getArchiveAll();
    const archives = response.data;
    // eslint-disable-next-line
    const newArchives = archives.map(({ content, ...archive }) => archive);
    commit(ROOT_MUTATIONS.SET_ARCHIVES, { archives: newArchives });
  },
};
