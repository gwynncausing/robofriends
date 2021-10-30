// import store from "@/store/index";

// const adviserGuard = (to, from, next) => {
//   if (store.getters["user/getAuthStatus"]) {
//     if (store.getters["user/getUserType"] == "ADVISER") next();
//     else {
//       next("/");
//     }
//   }
// };

const adviserRoutes = [
  {
    path: "/adviser",
    name: "",
    // beforeEnter: adviserGuard,
    component: () => import("@/modules/adviser/Module.vue"),
    children: [
      {
        path: "",
        name: "Adviser Dashboard",
        component: () => import("@/modules/adviser/views/Home.vue"),
      },
      {
        path: "settings",
        name: "Adviser Account Settings",
        component: () => import("@/views/AccountSettings.vue"),
      },
      {
        path: "manage-teams",
        name: "Manage Teams",
        component: () => import("@/modules/adviser/views/ManageTeams.vue"),
      },
      {
        path: "invitations",
        name: "Adviser Invitation",
        component: () => import("@/modules/adviser/views/Invitation.vue"),
      },
    ],
  },
];
export default adviserRoutes;
