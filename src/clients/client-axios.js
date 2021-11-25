import axios from "axios";
import { authInterceptor } from "./interceptors/auth-interceptor";
import { expireTokenHandler } from "./interceptors/expire-token-handler";

// const baseDomain = process.env.VUE_APP_BUD_API_HOSTED;
const baseDomain = process.env.VUE_APP_BUD_API_LOCALHOST;
const baseURL = `${baseDomain}`; // Incase of /api/v1;

const clientAxios = axios.create({
  baseURL,
});

clientAxios.interceptors.request.use(authInterceptor);
clientAxios.interceptors.response.use((config) => config, expireTokenHandler);

export default clientAxios;
