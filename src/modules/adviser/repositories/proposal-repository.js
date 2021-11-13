import Client from "@/clients/client-axios";
const resource = "/proposals";

export default {
  getProposal(id) {
    return Client.get(`${resource}/${id}`);
  },
  getProposalsByTeam(id) {
    return Client.get(`${resource}/teams/${id}`);
  },
  getProposalsByStatus(status, id) {
    return Client.get(`${resource}/teams/${id}?status=${status}`);
  },
  create(payload, id) {
    return Client.post(`${resource}/teams/${id}`, payload);
  },
  update(payload, id) {
    return Client.patch(`${resource}/${id}`, payload);
  },
  updateContent(payload, id) {
    return Client.patch(`${resource}/${id}/content`, payload);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
};
