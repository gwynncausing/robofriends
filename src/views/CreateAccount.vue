<template>
  <div class="signup">
    <div class="grid-item-content">
      <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain>
        <template v-slot:placeholder>
          <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        </template>
      </v-img>

      <div class="signup-form">
        <v-row>
          <h5 class="title-signup mb-8">Create Account</h5>
        </v-row>
        <v-form ref="form" lazy-validation>
          <TextField
            v-model="user.firstName"
            :rules="rules.firstName"
            label="First Name"
            name="first-name"
            required
          >
          </TextField>
          <TextField
            v-model="user.lastName"
            :rules="rules.lastName"
            label="Last Name"
            name="last-name"
            required
          >
          </TextField>
          <TextField
            v-model="user.email"
            :rules="rules.email"
            label="Institutional Email"
            required
          >
          </TextField>
          <TextField
            v-model="user.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            :rules="rules.password"
            @click:append="showPassword = !showPassword"
            @keydown.enter="signup()"
          >
          </TextField>
          <div v-if="error" class="errors">
            {{ error }}
          </div>
          <div>
            <ul class="password-rules">
              <li>Must contain the following:</li>
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
          <div class="d-flex py-6">
            <Button class="ml-auto" :loading="isSubmit" @click="signup()">
              Sign Up
            </Button>
          </div>
        </v-form>
      </div>

      <Button text block :to="{ path: '/' }">
        I already have an account.
      </Button>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import { capitalizeFirstLetter } from "@/utils/helpers";

import { mapActions } from "vuex";
import { ROOT_ACTIONS } from "@/store/types";
import { STATUS_CODES } from "@/utils/constants";

export default {
  name: "Signin",
  components: {
    TextField,
    Button,
  },
  data: function () {
    return {
      user: {},
      error: "",
      isSubmit: false,
      rules: {
        firstName: [
          (v) => !!v || "Last Name is required",
          (v) =>
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(v) ||
            "Invalid First Name",
        ],
        lastName: [
          (v) => !!v || "First Name is required",
          (v) =>
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(v) ||
            "Invalid Last Name",
        ],
        email: [
          (v) => !!v || "Email is required",
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Invalid Email",
        ],
        password: [
          (v) => !!v || "Password is required",
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
    };
  },
  watch: {
    "user.password": function () {
      if (this.user.password.length >= 8) {
        this.passwordRules[0].status = "200";
      } else this.passwordRules[0].status = "500";
      if (/[a-z]/.test(this.user.password)) {
        this.passwordRules[1].status = "200";
      } else this.passwordRules[1].status = "500";
      if (/[A-Z]/.test(this.user.password)) {
        this.passwordRules[2].status = "200";
      } else this.passwordRules[2].status = "500";
      if (/\d/.test(this.user.password)) {
        this.passwordRules[3].status = "200";
      } else this.passwordRules[3].status = "500";
      if (/(?=.*[*.!@$%^&{}[:;,.?\]\\+\-_])/.test(this.user.password)) {
        this.passwordRules[4].status = "200";
      } else this.passwordRules[4].status = "500";
    },
  },
  methods: {
    ...mapActions({
      onSignup: ROOT_ACTIONS.SIGNUP_USER,
    }),
    toCapitalize(input = "") {
      return input
        .toLowerCase()
        .split(" ")
        .map((word) => capitalizeFirstLetter(word))
        .join(" ");
    },
    async signup() {
      this.error = "";
      if (this.$refs.form.validate()) {
        this.user.firstName = this.toCapitalize(this.user.firstName);
        this.user.lastName = this.toCapitalize(this.user.lastName);
        try {
          this.isSubmit = true;
          await this.onSignup(this.user);
          this.$router.replace({ name: "Onboarding" });
        } catch (error) {
          switch (error?.response?.status) {
            case STATUS_CODES.ERRORS.BAD_REQUEST:
              this.error = error.response.data.error[0];
              break;
            default:
              break;
          }
        } finally {
          this.isSubmit = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
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
.signup-form {
  margin-top: 48px;
  .title-signup {
    color: var(--v-tertiary);
  }
}
.grid-item-content {
  grid-column: 1 / 5;
  height: fit-content;
}
.errors {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: var(--v-error);
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
