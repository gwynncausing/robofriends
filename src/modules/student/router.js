import { studentGuard } from "@/utils/guards";

const studentRoutes = [
  {
    path: "/student",
    name: "",
    beforeEnter: studentGuard,
    component: () => import("@/modules/student/Module.vue"),
    children: [
      // {
      //   path: "",
      //   name: "Student Dashboard",
      //   component: () => import("@/modules/student/views/Dashboard.vue"),
      // },
      {
        path: "settings",
        name: "Student Account Settings",
        component: () => import("@/views/AccountSettings.vue"),
      },
      {
        path: "team-settings",
        name: "Team Settings",
        component: () => import("@/views/TeamSettings.vue"),
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
      {
        path: "approved-research-version-history",
        name: "Approved Research Version History",
        component: () =>
          import("@/modules/student/views/ApprovedResearchVersionHistory.vue"),
      },
      {
        path: "research-editor-version-history",
        name: "Research Paper Version History",
        component: () =>
          import("@/modules/student/views/ResearchEditorVersionHistory.vue"),
      },
      {
        path: "archive",
        component: () => import("@/modules/student/views/Archive.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/Archive.vue"),
            name: "Student Archive",
          },
          {
            path: "research-paper/:id",
            component: () => import("@/views/ResearchPaper.vue"),
            name: "Student Research Paper",
          },
        ],
      },
    ],
  },
];

export default studentRoutes;
