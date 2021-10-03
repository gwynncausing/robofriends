import UserRepository from "./user-repository";
import AuthRepository from "./auth-repository";

const repositories = {
  users: UserRepository,
  auth: AuthRepository,
};
export default {
  get: (name) => repositories[name],
};
