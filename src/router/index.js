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
<<<<<<< HEAD
    path: "/docx",
    name: "Docx",
    component: () => import("@/views/DocxJSTest.vue"),
  },
  {
    path: "/docx2",
    name: "Docx2",
    component: () => import("@/views/DocxJSTest2.vue"),
  },
  {
    path: "/docx3",
    name: "Docx3",
    component: () => import("@/views/DocxJSTest3.vue"),
  },
  {
    path: "/docx4",
    name: "Docx4",
    component: () => import("@/views/DocxJSTest4.vue"),
  },
  {
    path: "/verify",
    name: "Email Verification",
    component: () => import("@/views/EmailVerification.vue"),
=======
    path: "/verify",
    name: "Email Verification",
    component: () => import("@/views/security/EmailVerification.vue"),
>>>>>>> feature/tiptap
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
<<<<<<< HEAD
    component: () => import("@/views/ForgotPassword.vue"),
=======
    component: () => import("@/views/security/ForgotPassword.vue"),
>>>>>>> feature/tiptap
  },
  {
    path: "/reset-password",
    name: "Reset Password",
<<<<<<< HEAD
    component: () => import("@/views/ForgotPasswordResetPassword.vue"),
=======
    component: () => import("@/views/security/ForgotPasswordResetPassword.vue"),
  },
  {
    path: "/reset-password-success",
    name: "Reset Password Success",
    component: () =>
      import("@/views/security/ForgotPasswordResetPasswordSuccess.vue"),
>>>>>>> feature/tiptap
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
    path: "/archive",
    name: "Archive",
    component: () => import("@/views/Archive.vue"),
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
