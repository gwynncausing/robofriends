/* References:
 *  [1] https://vuex.vuejs.org/
 *  [2] https://blog.logrocket.com/handling-authentication-in-your-graphql-powered-vue-app/
 *  [3] https://vuex.vuejs.org/guide/mutations.html
 *  [4] https://vuex.vuejs.org/guide/getters.html
 *
 *  Notes:
 *      Ways to access the store
 *
 *      import { mapActions, mapGetters } from "vuex"
 *      computed:
 *        ...mapGetters({getUserType: "user/getUserType"})
 *      actions:
 *      ...mapActions({onLogin: "user/login",})
 *
 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
