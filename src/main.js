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

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCfQHu1q5F9hG3GMB3W8hFElJmfpf3qI5s",
//   authDomain: "bud-dev-1531b.firebaseapp.com",
//   databaseURL:
//     "https://bud-dev-1531b-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "bud-dev-1531b",
//   storageBucket: "bud-dev-1531b.appspot.com",
//   messagingSenderId: "803627261639",
//   appId: "1:803627261639:web:a20b11f063e7b114c0a8e2",
//   measurementId: "G-WYCCTDFFE5",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
