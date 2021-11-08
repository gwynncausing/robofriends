import TeamRepository from "./team-repository";

const repositories = {
  team: TeamRepository,
};

export default {
  get: (name) => repositories[name],
};
