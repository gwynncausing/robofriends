import Vue from "vue";
import VueRouter from "vue-router";
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
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/create-account",
    name: "CreateAccount",
    component: () => import("@/views/CreateAccount.vue"),
  },
  {
    path: "/verify",
    name: "Email Verification",
    component: () => import("@/views/security/EmailVerification.vue"),
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: () => import("@/views/security/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    component: () => import("@/views/security/ForgotPasswordResetPassword.vue"),
  },
  {
    path: "/reset-password-success",
    name: "Reset Password Success",
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
