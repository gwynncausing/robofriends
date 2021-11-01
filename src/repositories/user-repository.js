import Client from "@/clients/client-axios";
const resource = "/users";

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getUser(id) {
    return Client.get(`${resource}/${id}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  update(payload, id) {
    return Client.patch(`${resource}/${id}`, payload);
  },
  changePassword(payload, id) {
    return Client.patch(`${resource}/change-password/${id}`, payload);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
};
