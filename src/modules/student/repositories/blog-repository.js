import Client from "@/clients/client-axios";
const resource = "/blogs";

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getBlog(id) {
    return Client.get(`${resource}/${id}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  update(payload, id) {
    return Client.put(`${resource}/${id}`, payload);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
};
