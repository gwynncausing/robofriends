import store from "@/store/index";

const studentGuard = (to, from, next) => {
  if (store.getters["user/getAuthStatus"]) {
    if (store.getters["user/getUserType"] == "STUDENT") {
      next();
    } else next("/");
  }
};

const studentRoutes = [
  {
    path: "/student",
    name: "",
    beforeEnter: studentGuard,
    component: () => import("@/modules/student/Module.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        meta: { name: "Home" },
        component: () => import("@/modules/student/views/Dashboard.vue"),
        children: [
          {
            path: "project",
            name: "Project Details",
            meta: { name: "Project Details" },
            component: () =>
              import("@/modules/student/views/ProjectDetails.vue"),
          },
          {
            path: "guide",
            name: "Recommended Guides",
            meta: { name: "Recommended Guides" },
            component: () =>
              import("@/modules/student/views/RecommendedGuides.vue"),
          },
          {
            path: "team",
            name: "Team Settings",
            meta: { name: "Team Settings" },
            component: () => import("@/modules/student/views/TeamSettings.vue"),
          },
        ],
      },
      {
        path: "create-team",
        name: "Create Team",
        meta: { name: "Create Team" },
        component: () => import("@/modules/student/views/CreateTeam.vue"),
      },
      {
        path: "invite",
        name: "StudentInvitation",
        component: () =>
          import("@/modules/student/views/StudentInvitation.vue"),
      },
      {
        path: "archive",
        name: "Archive",
        meta: { name: "Archive System" },
        component: () => import("@/modules/student/views/Archive.vue"),
      },
    ],
  },
];

export default studentRoutes;