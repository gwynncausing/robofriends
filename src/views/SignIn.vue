<template>
  <div class="signin">
    <div class="grid-item-content">
      <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain>
        <template v-slot:placeholder>
          <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        </template>
      </v-img>

      <v-form
        ref="form"
        class="signin-form"
        lazy-validation
        @submit.prevent="signin"
      >
        <TextField v-model="user.email" name="email" label="Email"></TextField>
        <TextField
          v-model="user.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="Password"
          @click:append="show1 = !show1"
        >
        </TextField>

        <div v-if="error" class="errors">
          {{ error }}
        </div>
        <div class="py-6">
          <Button block :loading="isSubmit" type="submit"> Sign In </Button>
        </div>
      </v-form>
      <div>
        <div>
          <Button text block :to="{ name: 'CreateAccount' }">
            No Account Yet? Get started here!
          </Button>
        </div>

        <div class="py-6">
          <Button text block :to="{ name: 'Forgot Password' }">
            I cannot access my account
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

import { mapGetters, mapActions } from "vuex";
import {
  STUDENT_GETTERS,
  STUDENT_ACTIONS,
} from "@/modules/student/store/types";
import { ROOT_GETTERS, ROOT_ACTIONS } from "@/store/types";
import { MODULES, USER, STATUS_CODES } from "@/utils/constants";
import { isObjectEmpty } from "@/utils/helpers";

export default {
  name: "Signin",
  components: {
    TextField,
    Button,
  },
  data: function () {
    return {
      user: {},
      userForSubmit: {},
      error: "",
      show1: false,
      isSubmit: false,
    };
  },
  computed: {
    ...mapGetters({
      getUser: ROOT_GETTERS.GET_USER,
      getUserType: ROOT_GETTERS.GET_USER_TYPE,
      hasMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_HAS_MEMBERSHIPS}`,
      getMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_MEMBERSHIPS}`,
      getSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS}`,
      getSubmittedProposals: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SUBMITTED_PROPOSALS}`,
      getApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL}`,
    }),
  },
  methods: {
    ...mapActions({
      onLogin: ROOT_ACTIONS.LOGIN_USER,
      onFetchMemberships: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_MEMBERSHIPS}`,
      onFetchSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SELECTED_TEAM_DETAILS}`,
      onFetchSubmittedProposals: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SUBMITTED_PROPOSALS}`,
      onFetchApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL}`,
      onLogoutUser: ROOT_ACTIONS.LOGOUT_USER,
    }),

    verifyEmailPassword() {
      return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        this.user.email
      );
    },

    handleErrors(status) {
      switch (status) {
        case STATUS_CODES.ERRORS.UNAUTHORIZED:
          this.error = "No user found for this email/password";
          break;
        case STATUS_CODES.ERRORS.NOT_FOUND:
          this.error = "No user found for this email/password";
          break;
        default:
          break;
      }
    },

    async signin() {
      let isEmailOk = this.verifyEmailPassword();
      if (isEmailOk || !this.user.password) {
        this.error = "Invalid Email or Password";
        return;
      }
      this.error = "";
      this.isSubmit = true;
      try {
        let location;
        await this.onLogin(this.user);
        if (this.getUser.deletedAt === null) {
          switch (this.getUserType) {
            case USER.TYPES.STUDENT:
              await this.onFetchMemberships();
              if (this.hasMemberships) {
                await this.onFetchSelectedTeamDetails({
                  id: this.getMemberships[0].team.id,
                });
                await this.onFetchApprovedProposal({
                  id: this.getSelectedTeamDetails.id,
                });
                if (!isObjectEmpty(this.getApprovedProposal)) {
                  location = {
                    name: "Research Details",
                    query: { tab: "approved-research" },
                  };
                } else {
                  await this.onFetchSubmittedProposals({
                    id: this.getSelectedTeamDetails.id,
                  });
                  if (this.getSubmittedProposals.length === 0) {
                    location = {
                      name: "Research Details",
                      query: { tab: "create-new" },
                    };
                  } else {
                    location = {
                      name: "Research Details",
                      query: { tab: "proposals" },
                    };
                  }
                }
              } else location = { name: "Create Team" };
              this.$router.replace(location);
              break;
            case USER.TYPES.TEACHER:
              this.$router.replace({ name: "Manage Teams" });
              break;
            default:
              this.$router.replace({ name: "Onboarding" });
              break;
          }
          // TODO: try to suggest to backend that if user is deleted, return an 401 error
        } else this.handleErrors(STATUS_CODES.ERRORS.UNAUTHORIZED);
      } catch (error) {
        this.handleErrors(error?.response?.status);
        console.log(error);
      } finally {
        this.isSubmit = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signin {
  max-width: 414px;
  min-width: 360px;
  padding: 40px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  height: 100%;
  width: 100%;
}

.grid-item-content {
  grid-column: 1 / 5;
  height: fit-content;
}
.forgot-password {
  margin-bottom: 40px;
  text-decoration: none;
}
.errors {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: var(--v-error);
}
.signin-form {
  margin-top: 48px;
}
</style>
