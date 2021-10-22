import store from "@/store";
import { GETTERS } from "@/store/types/getters";

const type = "Bearer";
const getAccessToken = () => store.getters[GETTERS.GET_TOKEN_ACCESS];

export const authInterceptor = (config) => {
  config.headers["Authorization"] = `${type} ${getAccessToken()}`;
  return config;
};
