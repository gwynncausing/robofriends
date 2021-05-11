import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "SignIn",
    meta: { name: "Sign In" },
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    meta: { name: "Sign Up" },
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/student",
    name: "",
    meta: { name: "Home" },
    component: () => import("@/views/Student.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/student/Dashboard.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
