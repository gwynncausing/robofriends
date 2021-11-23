import store from "@/store/index";
import { ROOT_GETTERS } from "@/store/types";
import { USER } from "@/utils/constants";

export const adviserGuard = (to, from, next) => {
  if (
    store.getters[ROOT_GETTERS.GET_IS_LOGGED_IN] &&
    store.getters[ROOT_GETTERS.GET_USER_TYPE] === USER.TYPES.TEACHER
  ) {
    next();
  } else next({ name: "SignIn" });
};

export const studentGuard = (to, from, next) => {
  if (
    store.getters[ROOT_GETTERS.GET_IS_LOGGED_IN] &&
    store.getters[ROOT_GETTERS.GET_USER_TYPE] === USER.TYPES.STUDENT
  ) {
    next();
  } else next({ name: "SignIn" });
};

export const loggedInGuard = (to, from, next) => {
  if (store.getters[ROOT_GETTERS.GET_IS_LOGGED_IN]) {
    if (to.name === "SignIn") {
      switch (store.getters[ROOT_GETTERS.GET_USER_TYPE]) {
        case USER.TYPES.STUDENT:
          next({ name: "Research Details" });
          break;
        case USER.TYPES.TEACHER:
          next({ name: "Manage Teams" });
          break;
        default:
          break;
      }
    } else next();
  } else next();
};
