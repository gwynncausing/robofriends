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
      },
      {
        path: "settings",
        name: "Student Account Settings",
        component: () => import("@/views/AccountSettings.vue"),
      },
      {
        path: "teamlist",
        name: "Team List",
        component: () => import("@/modules/student/views/TeamList.vue"),
      },
      {
        path: "create-team",
        name: "Create Team",
        component: () => import("@/modules/student/views/CreateTeam.vue"),
      },
      {
        path: "invitations",
        name: "Student Invitation",
        component: () => import("@/modules/student/views/Invitation.vue"),
      },
      {
        path: "research-details",
        name: "Research Details",
        component: () => import("@/modules/student/views/ResearchDetails.vue"),
      },
      {
        path: "editor",
        name: "Research Paper Editor",
        component: () =>
          import("@/modules/student/views/ResearchPaperEditor.vue"),
      },
    ],
  },
];

export default studentRoutes;
