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

const LOG_IN_USER = {
  email: String,
  password: String,
};

export const ROOT_PAYLOADS = {
  SIGNUP_USER,
  ONBOARD_USER,
  LOG_IN_USER,
};
