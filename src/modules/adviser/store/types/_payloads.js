const UPDATE_INVITATION = {
  id: String,
  invitation: {
    status: String,
  },
};

const FETCH_TEAM = {
  id: Number,
};

const FETCH_PENDING_PROPOSALS = {
  id: Number,
};

const FETCH_APPROVED_PROPOSAL = {
  id: Number,
};

const FETCH_ONE_PENDING_PROPOSAL = {
  id: Number,
};

const UPDATE_PROPOSAL = {
  id: Number,
  status: String,
  feedback: Object,
  teamId: Number,
};

export const ADVISER_PAYLOADS = {
  UPDATE_INVITATION,
  FETCH_TEAM,
  FETCH_PENDING_PROPOSALS,
  FETCH_APPROVED_PROPOSAL,
  FETCH_ONE_PENDING_PROPOSAL,
  UPDATE_PROPOSAL,
};
