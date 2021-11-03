import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import createPersistedState from "vuex-persistedstate";

import studentModule from "@/modules/student/store";
import adviserModule from "@/modules/adviser/store";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    student: studentModule,
    adviser: adviserModule,
  },
  plugins: [createPersistedState()],
});
