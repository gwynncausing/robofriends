const getAccessToken = () => "token";

export const authInterceptor = (config) => {
  config.headers["Authorization"] = getAccessToken();
  return config;
};
