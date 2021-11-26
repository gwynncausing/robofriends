export let rootInititalState = () => ({
  isLoggedIn: false,
  userMeta: {},
  user: {},
  userType: "",
  tokens: {
    access: "",
    refresh: "",
  },
  schools: {},
  currentSchool: {},
});
