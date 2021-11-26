export let rootInititalState = () => ({
  isLoggedIn: false,
  user: {},
  userType: "",
  tokens: {
    access: "",
    refresh: "",
  },
  schools: {},
  currentSchool: {},
});
