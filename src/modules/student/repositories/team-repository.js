import Client from "@/clients/client-axios";
const resource = "/teams";

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getTeam(id) {
    return Client.get(`${resource}/${id}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  update(payload, id) {
    return Client.patch(`${resource}/${id}`, payload);
  },
  invite(payload, id) {
    return Client.post(`${resource}/${id}/invite-many`, payload);
  },
  updateInvite(payload, id) {
    return Client.patch(`${resource}/invitations/${id}`, payload);
  },
  joinTeam(payload) {
    return Client.post(`${resource}/code`, payload);
  },
  getInvitations() {
    return Client.get(`${resource}/invitations`);
  },
  getMemberships() {
    return Client.get(`${resource}/memberships`);
  },
  updateMemberships(payload, id) {
    return Client.patch(`${resource}/memberships/${id}`, payload);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
};
