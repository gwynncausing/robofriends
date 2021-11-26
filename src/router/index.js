import Vue from "vue";
import VueRouter from "vue-router";
import { loggedInGuard } from "../utils/guards";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/",
    name: "SignIn",
    beforeEnter: loggedInGuard,
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/create-account",
    name: "CreateAccount",
    beforeEnter: loggedInGuard,
    component: () => import("@/views/CreateAccount.vue"),
  },
  {
    path: "/verify",
    name: "Email Verification",
    beforeEnter: loggedInGuard,
    component: () => import("@/views/security/EmailVerification.vue"),
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    beforeEnter: loggedInGuard,
    component: () => import("@/views/security/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    beforeEnter: loggedInGuard,
    component: () => import("@/views/security/ForgotPasswordResetPassword.vue"),
  },
  {
    path: "/reset-password-success",
    name: "Reset Password Success",
    beforeEnter: loggedInGuard,
    component: () =>
      import("@/views/security/ForgotPasswordResetPasswordSuccess.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test.vue"),
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    beforeEnter: loggedInGuard,
    component: () => import("@/views/Onboarding.vue"),
  },
  {
    path: "*",
    name: "PageNotFound",
    component: () => import("@/views/errors/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
