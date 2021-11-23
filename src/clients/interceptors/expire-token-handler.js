import clientAxios from "@/clients/client-axios.js";
import store from "@/store/index";
import { ROOT_GETTERS } from "@/store/types";
import { ROOT_ACTIONS, ROOT_MUTATIONS } from "@/store/types";
import { STATUS_CODES } from "@/utils/constants";

export const expireTokenHandler = (error) => {
  const originalRequest = error.config;
  if (
    error.response.status === STATUS_CODES.ERRORS.UNAUTHORIZED &&
    !originalRequest._retry &&
    originalRequest.url !== "/refresh"
  ) {
    originalRequest._retry = true;
    const payload = {
      id: store.getters[ROOT_GETTERS.GET_USER].id,
      lastName: store.getters[ROOT_GETTERS.GET_USER].lastName,
      refreshToken: store.getters[ROOT_GETTERS.GET_TOKEN_REFRESH],
    };
    return clientAxios.post("/refresh", payload).then((res) => {
      if (res.status === STATUS_CODES.SUCCESS.CREATE) {
        const { refresh_token, access_token } = res.data;
        store.commit(ROOT_MUTATIONS.SET_TOKEN_REFRESH, {
          refresh: refresh_token,
        });
        store.commit(ROOT_MUTATIONS.SET_TOKEN_ACCESS, {
          access: access_token,
        });
        clientAxios.defaults.headers.common["Authorization"] = `Bearer ${
          store.getters[ROOT_GETTERS.GET_TOKEN_ACCESS]
        }`;
        return clientAxios(originalRequest);
      }
    });
  } else if (
    originalRequest.url === "/refresh" &&
    error.response.status === STATUS_CODES.ERRORS.UNAUTHORIZED
  ) {
    store.dispatch(ROOT_ACTIONS.LOGOUT_USER);
    window.location.href = "/";
  }
  return Promise.reject(error);
};
