const CREATE_USER = {
  email: String,
  password: String,
  confirmPassword: String,
  firstName: String,
  lastName: String,
  phone: String,
  idNumber: String,
  year: Number,
  program: String,
  department: String,
  college: String,
  schoolId: String,
  type: String,
};

const UPDATE_USER = {
  email: String,
  password: String,
  confirmPassword: String,
  firstName: String,
  lastName: String,
  phone: String,
  idNumber: String,
  year: Number,
  program: String,
  department: String,
  college: String,
  schoolId: String,
  type: String,
};

const LOG_IN_USER = {
  email: String,
  password: String,
};

export const PAYLOADS = {
  CREATE_USER,
  UPDATE_USER,
  LOG_IN_USER,
};
