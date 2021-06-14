import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

const authGuard = (to, from, next) => {
  if (store.getters["user/getAuthStatus"]) {
    if (store.getters["user/getUserType"] == "STUDENT") next("/student");
    else next("/adviser");
  } else next();
};

const routes = [
  {
    path: "/",
    name: "SignIn",
    meta: { name: "Sign In" },
    beforeEnter: authGuard,
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    meta: { name: "Sign Up" },
    beforeEnter: authGuard,
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next("/");
  } else {
    next();
  }
});

// router.beforeEach(() => {
//   document.title = `${process.env.VUE_APP_TITLE}`;
// });

export default router;
