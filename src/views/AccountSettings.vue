<template>
  <div id="account-settings" class="d-flex justify-center">
    <v-form
      ref="settings-form"
      lazy-validation
      @submit.prevent="finishOnboarding()"
    >
      <v-row id="account-settings-wrapper" class="mt-6">
        <v-col cols="12">
          <header>
            <h5 class="tertiary--text">Account Settings</h5>
          </header>
        </v-col>
        <v-col cols="12" sm="6" md="5">
          <TextField
            v-model="user.firstName"
            placeholder="First Name"
            name="first-name"
            :disabled="true"
          />
          <TextField
            v-model="user.lastName"
            placeholder="Last Name"
            name="last-name"
            :disabled="true"
          />
          <TextField
            v-model="user.email"
            placeholder="Email"
            name="email"
            :disabled="true"
          />
          <Button
            class="align-self-end"
            text
            @click="changePasswordModal = true"
            >Change Password</Button
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="5">
          <Select
            v-model="user.schoolId"
            label="School"
            name="school"
            :items="schools"
            item-text="name"
            item-value="id"
            :disabled="false"
            :rules="rules.schoolId"
          />

          <Select
            v-model="user.collegeId"
            label="College"
            name="college"
            :items="colleges"
            item-text="name"
            item-value="id"
            outlined
            dense
            :rules="rules.collegeId"
          />
          <Select
            v-if="getUserType === 'student'"
            v-model="user.program"
            label="Program"
            name="program"
            :items="programs"
            outlined
            dense
            class="program"
            :rules="rules.program"
          />
          <TextField
            v-model="user.idNumber"
            label="ID Number"
            name="id-number"
            disabled
          />
        </v-col>
        <v-col cols="12" class="d-flex">
          <Button
            text
            class="delete-account error--text"
            @click="deleteAccountModal = true"
          >
            Delete Account
          </Button>
          <v-spacer></v-spacer>
          <Button
            class="update-account"
            :loading="isSavingChanges"
            @click="saveChanges"
            >Save Changes</Button
          >
        </v-col>
      </v-row>
    </v-form>
    <ModalDeleteAccount
      :dialog-props="deleteAccountModal"
      :is-loading="isDeletingAccount"
      @dialogClose="deleteAccountModal = $event"
      @dialogDeleteAccount="deleteAccount"
    />
    <ModalChangePassword
      :dialog-props="changePasswordModal"
      :is-loading="isChangingPassword"
      :errors="changePasswordErrors"
      :success-message="changePasswordSuccessMessage"
      :reset="isResetChangePassword"
      @dialogClose="($event) => closeChangePasswordModal($event)"
      @dialogChangePassword="changePassword"
    />
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import Select from "@/components/global/Select.vue";
import ModalDeleteAccount from "@/components/ModalDeleteAccount.vue";
import ModalChangePassword from "@/components/ModalChangePassword.vue";
import { mapActions, mapGetters } from "vuex";
import { ROOT_ACTIONS, ROOT_GETTERS } from "@/store/types";
import { USER, STATUS_CODES } from "@/utils/constants";

export default {
  name: "AccountSettings",
  components: {
    TextField,
    Button,
    Select,
    ModalDeleteAccount,
    ModalChangePassword,
  },
  data() {
    return {
      changePasswordModal: false,
      isChangingPassword: false,
      isResetChangePassword: false,
      changePasswordErrors: [],
      changePasswordSuccessMessage: "",
      deleteAccountModal: false,
      isDeletingAccount: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        schoolId: "",
        idNumber: "",
        collegeId: "",
        program: "",
      },
      schools: [],
      colleges: [],
      programs: [],
      isSavingChanges: false,
      rules: {
        schoolId: [(v) => !!v || "School is required"],
        collegeId: [(v) => !!v || "College is required"],
        program: [(v) => !!v || "Program is required"],
      },
    };
  },
  computed: {
    ...mapGetters({
      getSchools: ROOT_GETTERS.GET_SCHOOLS,
      getUser: ROOT_GETTERS.GET_USER,
      getUserType: ROOT_GETTERS.GET_USER_TYPE,
    }),
  },
  watch: {
    "user.schoolId": function () {
      this.colleges = this.schools.find(
        (school) => school.id === this.user.schoolId
      ).colleges;
      this.programs = [];
    },
    "user.collegeId": function () {
      this.programs = this.colleges.find(
        (college) => college.id === this.user.collegeId
      ).programs;
    },
  },
  async created() {
    try {
      await this.fetchSchools();
      this.schools = this.getSchools;
      this.initializeUserInformation();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions({
      onFetchSchools: ROOT_ACTIONS.FETCH_SCHOOLS,
      onOnboardUser: ROOT_ACTIONS.ONBOARD_USER,
      onUpdateUser: ROOT_ACTIONS.UPDATE_USER,
      onGetUserInfo: ROOT_ACTIONS.GET_USER_INFO,
      onChangePassword: ROOT_ACTIONS.CHANGE_PASSWORD,
    }),
    fetchSchools() {
      return this.onFetchSchools();
    },
    initializeUserInformation() {
      this.user.firstName = this.getUser.firstName;
      this.user.lastName = this.getUser.lastName;
      this.user.email = this.getUser.email;
      this.user.idNumber = this.getUser.idNumber;
      this.user.schoolId = this.getUser.schoolId;
      this.user.collegeId = this.getUser.collegeId;
      this.user.program = this.getUser?.program;
    },
    closeChangePasswordModal(status) {
      this.changePasswordModal = status;
      this.changePasswordErrors = [];
      this.changePasswordSuccessMessage = "";
    },
    async saveChanges() {
      if (!this.$refs["settings-form"].validate()) return;
      try {
        this.isSavingChanges = true;
        const user = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          schoolId: this.user.schoolId,
          collegeId: this.user.collegeId,
        };
        if (this.getUserType === USER.TYPES.STUDENT)
          user.program = this.user.program;
        const payload = { id: this.getUser.id, user: user };
        await this.onUpdateUser(payload);
        await this.onGetUserInfo({ id: this.getUser.id });
      } catch (error) {
        console.log(error);
      } finally {
        this.isSavingChanges = false;
      }
    },
    async changePassword(passwords) {
      try {
        this.changePasswordErrors = [];
        this.isChangingPassword = true;
        this.changePasswordSuccessMessage = "";
        const payload = {
          id: this.getUser.id,
          passwords: {
            oldPassword: passwords.old,
            newPassword: passwords.new,
            confirmPassword: passwords.confirm,
          },
        };
        await this.onChangePassword(payload);
        this.isResetChangePassword = true;
        this.changePasswordSuccessMessage = "Changed password successfully";
      } catch (error) {
        switch (error?.response?.status) {
          case STATUS_CODES.ERRORS.BAD_REQUEST:
            this.changePasswordErrors.push(error.response.data.errors[0]);
            break;
          default:
            console.log(error);
            break;
        }
      } finally {
        this.isChangingPassword = false;
      }
    },
    deleteAccount() {
      console.log("Delete Account");
    },
  },
};
</script>

<style lang="scss" scoped>
#account-settings {
  #account-settings-wrapper {
    max-width: 960px;
  }
  header {
    margin-bottom: 1rem;
  }
}
</style>
