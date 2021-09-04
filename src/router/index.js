import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/create-account",
    name: "CreateAccount",
    component: () => import("@/views/CreateAccount.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test.vue"),
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: () => import("@/views/Onboarding.vue"),
  },
  {
    path: "*",
    name: "PageNotFound",
    component: () => import("@/views/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
