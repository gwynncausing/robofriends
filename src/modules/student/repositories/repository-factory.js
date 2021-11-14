import ProposalRepository from "./proposal-repository";
import TeamRepository from "./team-repository";

const repositories = {
  team: TeamRepository,
  proposal: ProposalRepository,
};

export default {
  get: (name) => repositories[name],
};
