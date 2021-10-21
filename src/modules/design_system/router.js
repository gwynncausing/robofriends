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
      {
        path: "textfields",
        name: "TextFields",
        meta: { name: "TextFields List" },
        component: () =>
          import("@/modules/design_system/views/TextFieldsList.vue"),
      },
      {
        path: "textareas",
        name: "Textareas",
        meta: { name: "Textareas List" },
        component: () =>
          import("@/modules/design_system/views/TextareasList.vue"),
      },
      {
        path: "combobox",
        name: "Combobox",
        meta: { name: "Combobox List" },
        component: () =>
          import("@/modules/design_system/views/ComboboxList.vue"),
      },
      {
        path: "chips",
        name: "Chips",
        meta: { name: "Chips List" },
        component: () => import("@/modules/design_system/views/ChipsList.vue"),
      },
      {
        path: "selects",
        name: "Selects",
        meta: { name: "Selects List" },
        component: () =>
          import("@/modules/design_system/views/SelectsList.vue"),
      },
    ],
  },
];

export default designSystemRoutes;
