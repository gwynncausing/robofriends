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

const adviserGuard = (to, from, next) => {
  if (store.getters["user/getAuthStatus"]) {
    if (store.getters["user/getUserType"] == "ADVISER") next();
    else next("/");
  }
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
  {
    path: "/adviser",
    name: "",
    meta: { name: "Adviser" },
    beforeEnter: adviserGuard,
    component: () => import("@/views/Adviser.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/adviser/Home.vue"),
      },
      {
        path: "invite",
        name: "AdviserInvitation",
        component: () => import("@/views/adviser/AdviserInvitation.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (!to.matched.length) {
//     next("/404");
//   } else {
//     next();
//   }
// });

// router.beforeEach(() => {
//   document.title = `${process.env.VUE_APP_TITLE}`;
// });

export default router;
