import UserRepository from "./user-repository";
import AuthRepository from "./auth-repository";
import TestRepository from "./test-repository";

const repositories = {
  users: UserRepository,
  auth: AuthRepository,
  test: TestRepository,
};
export default {
  get: (name) => repositories[name],
};
