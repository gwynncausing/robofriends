import router from "./router";
import store from "./store";

const registerModule = (name, module) => {
  if (module.store) {
    store.registerModule(name, module.store, { preserveState: true });
  }

  if (module.router) {
    router.addRoute(module.router[0]);
  }
};

export const registerModules = (modules) => {
  Object.keys(modules).forEach((moduleKey) => {
    const module = modules[moduleKey];
    registerModule(moduleKey, module);
  });
};
