const CREATE_TEAM = {
  name: String,
};

const SEND_TEAM_INVITATIONS = {
  invitedEmails: Array,
  baseRole: String,
};

const UPDATE_INVITATION = {
  id: String,
  invitation: {
    status: String,
  },
};

const JOIN_CODE_TEAM_PAYLOAD = {
  code: String,
};

const UPDATE_MEMBERSHIP_STATUS = {
  status: String,
  baseRole: String,
};

const UPDATE_SELECTED_TEAM_DETAILS = {
  id: Number,
  team: {
    name: String,
    description: String,
  },
};

export const STUDENT_PAYLOADS = {
  CREATE_TEAM,
  SEND_TEAM_INVITATIONS,
  UPDATE_INVITATION,
  JOIN_CODE_TEAM_PAYLOAD,
  UPDATE_MEMBERSHIP_STATUS,
  UPDATE_SELECTED_TEAM_DETAILS,
};
