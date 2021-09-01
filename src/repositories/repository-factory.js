import UserRepository from "./user-repository";
import TestRepository from "./test-repository";

const repositories = {
  users: UserRepository,
  test: TestRepository,
};
export default {
  get: (name) => repositories[name],
};
