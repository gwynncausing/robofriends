<template>
  <div id="reset-password">
    <router-link :to="{ name: 'SignIn' }">
      <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain>
      </v-img>
    </router-link>

    <h5>Reset Password</h5>

    <div class="description">Choose your new Password</div>
    <v-form
      ref="form"
      class="input-field"
      lazy-validation
      @submit.prevent="resendEmail"
    >
      <TextField
        v-model="passwords.new"
        label="New Password"
        :append-icon="show.newPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show.newPassword ? 'text' : 'password'"
        :rules="rules.new"
        @click:append="show.newPassword = !show.newPassword"
      />
      <TextField
        v-model="passwords.confirm"
        label="Confirm Password"
        :append-icon="show.confirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show.confirmPassword ? 'text' : 'password'"
        :rules="[
          (v) => !!v || 'Confirm your new password.',
          () => passwords.new === passwords.confirm || 'Password must match',
        ]"
        @click:append="show.confirmPassword = !show.confirmPassword"
      />
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
      <div v-if="hasError" class="message-holder error--text">
        {{ error }}
      </div>
      <Button
        class="submit-button"
        :loading="isResettingPassword"
        @click="resetPassword"
      >
        Reset</Button
      >
    </v-form>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import TextField from "@/components/global/TextField.vue";
import { mapActions } from "vuex";
import { ROOT_ACTIONS } from "@/store/types";
import { STATUS_CODES } from "@/utils/constants";

export default {
  name: "ForgotPasswordResetPassword",
  components: {
    Button,
    TextField,
  },
  data() {
    return {
      hasError: false,
      error: "",
      isResettingPassword: false,
      passwords: {
        new: "",
        confirm: "",
      },
      show: {
        newPassword: false,
        confirmPassword: false,
      },
      rules: {
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
    };
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
  },

  methods: {
    ...mapActions({
      onResetPassword: ROOT_ACTIONS.RESET_PASSWORD,
    }),
    async resetPassword() {
      if (!this.$refs.form.validate()) return;
      try {
        this.hasError = false;
        this.isResettingPassword = true;
        const token = this.$route.query.token;
        const payload = {
          token: token,
          newPassword: this.passwords.new,
          confirmPassword: this.passwords.confirm,
        };
        await this.onResetPassword(payload);
        this.message = "You may now check your email";
        this.resetForm();
        this.$router.replace({ name: "Reset Password Success" });
      } catch (error) {
        this.hasError = true;
        switch (error?.response?.status) {
          case STATUS_CODES.BAD_REQUEST:
            this.error = "Passwords do not match";
            break;
          case STATUS_CODES.ERRORS.UNAUTHORIZED:
            this.error = "Invalid or Expired token. You may resend the link.";
            break;
          default:
            break;
        }
      } finally {
        this.isResettingPassword = false;
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.passwords.new = "";
      this.passwords.confirm = "";
      this.show.newPassword = "";
      this.show.confirmPassword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
#reset-password {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 421px;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;
  h5 {
    color: $tertiary;
  }
  .description,
  h5 {
    align-self: start;
  }
  .input-field {
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
  }
  .submit-button {
    width: fit-content;
    align-self: end;
  }
  .password-rules {
    list-style-type: none;
    padding: 0;
    margin: 0;
    .password-rule {
      text-indent: 30px;
    }
  }
  .message-holder {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>
