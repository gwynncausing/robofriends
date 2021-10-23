import axios from "axios";
import { authInterceptor } from "./interceptors/auth-interceptor";

const baseDomain = process.env.VUE_APP_BUD_API_HOSTED;
const baseURL = `${baseDomain}`; // Incase of /api/v1;

const clientAxios = axios.create({
  baseURL,
});

clientAxios.interceptors.request.use(authInterceptor);

export default clientAxios;
