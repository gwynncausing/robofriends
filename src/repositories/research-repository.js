import Client from "@/clients/client-axios";
const resource = "/research";

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getResearch(id) {
    return Client.get(`${resource}/${id}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  update(payload, id) {
    return Client.patch(`${resource}/${id}`, payload);
  },
  saveNewHistory(payload, id) {
    return Client.post(`${resource}/${id}/history`, payload);
  },
  getHistory(id) {
    return Client.get(`${resource}/${id}/history`);
  },
  getLatestHistory(id) {
    return Client.get(`${resource}/${id}/history/latest`);
  },
  getResearchArchive(id) {
    return Client.get(`${resource}/${id}/archive`);
  },
  getArchiveAll() {
    return Client.get(`${resource}/archive/all`);
  },
  getArchive(id) {
    return Client.get(`${resource}/archive/${id}`);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
};
