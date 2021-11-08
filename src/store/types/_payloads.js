const SIGNUP_USER = {
  email: String,
  password: String,
  confirmPassword: String,
  firstName: String,
  lastName: String,
};

const ONBOARD_USER = {
  id: Number,
  user: {
    firstName: String,
    lastName: String,
    idNumber: String,
    program: String,
    collegeId: String,
    schoolId: String,
    type: String,
  },
};

const UPDATE_USER = {
  id: Number,
  user: {
    firstName: String,
    lastName: String,
    schoolId: String,
    collegeId: String,
    // * only present in student
    program: String,
  },
};

const LOG_IN_USER = {
  email: String,
  password: String,
};

const GET_USER_INFO = {
  id: Number,
};

const CHANGE_PASSWORD = {
  id: Number,
  passwords: {
    oldPassword: String,
    newPassword: String,
    confirmPassword: String,
  },
};

const SEND_PASSWORD_RESET_LINK = {
  email: String,
};

const RESET_PASSWORD = {
  token: String,
  newPassword: String,
  confirmPassword: String,
};

export const ROOT_PAYLOADS = {
  SIGNUP_USER,
  ONBOARD_USER,
  UPDATE_USER,
  GET_USER_INFO,
  LOG_IN_USER,
  CHANGE_PASSWORD,
  SEND_PASSWORD_RESET_LINK,
  RESET_PASSWORD,
};
