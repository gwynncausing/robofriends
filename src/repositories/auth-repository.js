import Client from "@/clients/client-axios";
const resource = "";

export default {
  login(payload) {
    return Client.post(`${resource}/login`, payload);
  },
};
