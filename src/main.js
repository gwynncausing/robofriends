import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueDragscroll from "vue-dragscroll";
import { VExpansionPanels } from "vuetify/lib";

import studentModule from "@/modules/student";
import adviserModule from "@/modules/adviser";
import designSystemModule from "@/modules/design_system";

import { registerModules } from "./register-modules";

import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

registerModules({
  student: studentModule,
  adviser: adviserModule,
  design_system: designSystemModule,
});

Vue.config.productionTip = false;
Vue.component("v-expansion-panels", VExpansionPanels);
Vue.use(VueDragscroll);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
