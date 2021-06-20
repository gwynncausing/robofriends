const designSystemRoutes = [
  {
    path: "/design-system",
    name: "",
    component: () => import("@/modules/design_system/Module.vue"),
    children: [
      {
        path: "",
        name: "Buttons",
        meta: { name: "Buttons List" },
        component: () =>
          import("@/modules/design_system/views/ButtonsList.vue"),
      },
    ],
  },
];

export default designSystemRoutes;
