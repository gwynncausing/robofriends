// import store from "@/store/index";

// const studentGuard = (to, from, next) => {
//   if (store.getters["user/getAuthStatus"]) {
//     if (store.getters["user/getUserType"] == "STUDENT") {
//       next();
//     } else next("/");
//   }
// };

const studentRoutes = [
  {
    path: "/student",
    name: "",
    // beforeEnter: studentGuard,
    component: () => import("@/modules/student/Module.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/modules/student/views/Dashboard.vue"),
        // children: [
        //   {
        //     path: "project",
        //     name: "Project Details",
        //     component: () =>
        //       import("@/modules/student/views/ProjectDetails.vue"),
        //   },
        //   {
        //     path: "guide",
        //     name: "Recommended Guides",
        //     component: () =>
        //       import("@/modules/student/views/RecommendedGuides.vue"),
        //   },
        //   {
        //     path: "team",
        //     name: "Team Settings",
        //     component: () => import("@/modules/student/views/TeamSettings.vue"),
        //   },
        // ],
      },
      {
        path: "teamlist",
        name: "TeamList",
        component: () => import("@/modules/student/views/TeamList.vue"),
      },
      {
        path: "create-team",
        name: "Create Team",
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
        component: () => import("@/modules/student/views/Archive.vue"),
      },
    ],
  },
];

export default studentRoutes;
