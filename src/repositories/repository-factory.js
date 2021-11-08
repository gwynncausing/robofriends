import UserRepository from "./user-repository";
import AuthRepository from "./auth-repository";
import SchoolRepository from "./school-repository";

const repositories = {
  user: UserRepository,
  auth: AuthRepository,
  school: SchoolRepository,
};
export default {
  get: (name) => repositories[name],
};
