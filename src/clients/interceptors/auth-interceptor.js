import store from "@/store";
import { ROOT_GETTERS } from "@/store/types/getters";

const type = "Bearer";
const getAccessToken = () => store.getters[ROOT_GETTERS.GET_TOKEN_ACCESS];

export const authInterceptor = (config) => {
  config.headers["Authorization"] = `${type} ${getAccessToken()}`;
  return config;
};
