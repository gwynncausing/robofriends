import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import studentModule from "@/modules/student";
import adviserModule from "@/modules/adviser";
import designSystemModule from "@/modules/design_system";

import { registerModules } from "./register-modules";

registerModules({
  student: studentModule,
  adviser: adviserModule,
  design_system: designSystemModule,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
