import { mapGetters, mapActions } from "vuex";
import { ROOT_GETTERS, ROOT_ACTIONS } from "@/store/types";

export const rootVuexMixin = {
  computed: {
    ...mapGetters({
      rootx_getUser: ROOT_GETTERS.GET_USER,
      rootx_getAccessToken: ROOT_GETTERS.GET_TOKEN_ACCESS,
      rootx_getTokenRefresh: ROOT_GETTERS.GET_TOKEN_REFRESH,
      rootx_getIsLoggedIn: ROOT_GETTERS.GET_IS_LOGGED_IN,
      rootx_getUserType: ROOT_GETTERS.GET_USER_TYPE,
      rootx_getSchools: ROOT_GETTERS.GET_SCHOOLS,
    }),
  },
  methods: {
    ...mapActions({
      rootx_onLoginUser: ROOT_ACTIONS.LOGIN_USER,
      rootx_onSignupUser: ROOT_ACTIONS.SIGNUP_USER,
      rootx_onGetUserInfo: ROOT_ACTIONS.GET_USER_INFO,
      rootx_onOnboardUser: ROOT_ACTIONS.ONBOARD_USER,
      rootx_onUpdateUser: ROOT_ACTIONS.UPDATE_USER,
      rootx_onChangePassword: ROOT_ACTIONS.CHANGE_PASSWORD,
      rootx_onFetchSchools: ROOT_ACTIONS.FETCH_SCHOOLS,
      rootx_onSendPasswordResetLink: ROOT_ACTIONS.SEND_PASSWORD_RESET_LINK,
      rootx_onResetPassword: ROOT_ACTIONS.RESET_PASSWORD,
      rootx_onVerifyAccount: ROOT_ACTIONS.VERIFY_ACCOUNT,
      rootx_onResendVerificationLink: ROOT_ACTIONS.RESEND_VERIFICATION_LINK,
      rootx_onLogoutUser: ROOT_ACTIONS.LOGOUT_USER,
      rootx_onDeleteUser: ROOT_ACTIONS.DELETE_USER,
    }),
  },
};
