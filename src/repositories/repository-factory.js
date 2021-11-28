import UserRepository from "./user-repository";
import AuthRepository from "./auth-repository";
import SchoolRepository from "./school-repository";
import ResearchRepository from "./research-repository";

const repositories = {
  user: UserRepository,
  auth: AuthRepository,
  school: SchoolRepository,
  research: ResearchRepository,
};
export default {
  get: (name) => repositories[name],
};
