import TeamRepository from "./team-repository";
import ProposalRepository from "./proposal-repository";

const repositories = {
  team: TeamRepository,
  proposals: ProposalRepository,
};

export default {
  get: (name) => repositories[name],
};
