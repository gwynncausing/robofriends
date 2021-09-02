import { SET_TEST } from "./types/mutations";

export default {
  [SET_TEST](state, { test }) {
    state.test = test;
  },
};
