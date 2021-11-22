<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Change Password</h4>
    </template>
    <template v-slot:content>
      <v-form ref="form" lazy-validation>
        <div class="pt-5">
          <TextField
            v-model="passwords.old"
            :append-icon="show.oldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.oldPassword ? 'text' : 'password'"
            placeholder="Old Password"
            name="oldPassword"
            required
            :rules="rules.old"
            @click:append="show.oldPassword = !show.oldPassword"
          />
          <TextField
            v-model="passwords.new"
            :append-icon="show.newPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.newPassword ? 'text' : 'password'"
            placeholder="New Password"
            name="newPassword"
            required
            :rules="rules.new"
            @click:append="show.newPassword = !show.newPassword"
          />
          <TextField
            v-model="passwords.confirm"
            :append-icon="show.confirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.confirmPassword ? 'text' : 'password'"
            :rules="[
              (v) => !!v || 'Confirm your new password.',
              () =>
                passwords.new === passwords.confirm || 'Password must match',
            ]"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            @click:append="show.confirmPassword = !show.confirmPassword"
          />
        </div>
        <div>
          <ul class="password-rules mt-5">
            <li>New password must contain the following:</li>
            <li
              v-for="item in passwordRules"
              :key="item.rule"
              class="password-rule"
            >
              <v-icon v-if="item.status === '200'" color="primary"
                >mdi-check</v-icon
              >
              <v-icon v-else color="neutral-200">mdi-close</v-icon>
              {{ item.rule }}
            </li>
          </ul>
        </div>
        <div v-if="hasErrors" class="message-holder error--text">
          {{ errors[0] }}
        </div>
        <div v-if="successMessage !== ''" class="message-holder primary--text">
          {{ successMessage }}
        </div>
        <div class="d-flex mt-8">
          <v-spacer></v-spacer>
          <Button text @click="closeModal()">Cancel</Button>
          <Button :loading="isLoading" @click="changePassword">Change</Button>
        </div>
      </v-form>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "JoinTeamModal",
  components: {
    Modal,
    TextField,
    Button,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    successMessage: {
      type: String,
      default: "",
    },
    errors: {
      type: Array,
      default: () => [],
    },
    reset: {
      type: Boolean,
      default: false,
    },
    dialogProps: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      passwords: {
        old: "",
        new: "",
        confirm: "",
      },
      rules: {
        old: [(v) => !!v || "Old password is required"],
        new: [
          (v) => !!v || "New password is required",
          (v) =>
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&{}[:;,.?\]\\+\-_]).{8,}/.test(
              v
            ) || "Password must meet the requirements",
        ],
      },
      passwordRules: [
        {
          status: "500",
          rule: "At least 8 characters",
        },
        {
          status: "500",
          rule: "At least 1 lowercase letter",
        },
        {
          status: "500",
          rule: "At least 1 uppercase letter",
        },
        {
          status: "500",
          rule: "At least 1 number",
        },
        {
          status: "500",
          rule: "At least 1 symbol",
        },
      ],
      showPassword: false,
      dialog: false,
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length !== 0 ? true : false;
    },
  },
  watch: {
    "passwords.new": function () {
      if (this.passwords.new.length >= 8) {
        this.passwordRules[0].status = "200";
      } else this.passwordRules[0].status = "500";
      if (/[a-z]/.test(this.passwords.new)) {
        this.passwordRules[1].status = "200";
      } else this.passwordRules[1].status = "500";
      if (/[A-Z]/.test(this.passwords.new)) {
        this.passwordRules[2].status = "200";
      } else this.passwordRules[2].status = "500";
      if (/\d/.test(this.passwords.new)) {
        this.passwordRules[3].status = "200";
      } else this.passwordRules[3].status = "500";
      if (/(?=.*[*.!@$%^&{}[:;,.?\]\\+\-_])/.test(this.passwords.new)) {
        this.passwordRules[4].status = "200";
      } else this.passwordRules[4].status = "500";
    },
    dialogProps(newVal) {
      this.dialog = newVal;
    },
    dialog(newVal) {
      this.$emit("dialogClose", newVal);
    },
    reset() {
      if (this.reset === true) this.resetForm();
    },
  },
  methods: {
    closeModal() {
      this.resetForm();
      this.dialog = false;
    },
    changePassword() {
      if (this.$refs.form.validate())
        this.$emit("dialogChangePassword", this.passwords);
    },
    resetForm() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.passwords.old = "";
      this.passwords.new = "";
      this.passwords.confirm = "";
      this.show.oldPassword = "";
      this.show.newPassword = "";
      this.show.confirmPassword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.message-holder {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.password-rules {
  list-style-type: none;
  padding: 0;
  margin: 0;
  .password-rule {
    text-indent: 30px;
  }
}
</style>
