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
        <!-- <v-window v-model="step">
          <v-window-item :value="1">
            <v-item-group v-model="selectedUserType" mandatory>
              <div class="student-teacher-wrapper">
                <div v-for="(type, userIndex) in userType" :key="userIndex">
                  <v-item v-slot="{ active, toggle }" class="m-0">
                    <v-card
                      flat
                      :color="active ? 'neutral-50' : ''"
                      @click="toggle"
                    >
                      <v-img contain max-height="250px" :src="type.img"></v-img>
                      <div
                        class="student-teacher-toggle button-font"
                        :class="active ? 'secondary' : 'primary'"
                      >
                        {{ type.name }}
                      </div>
                    </v-card>
                  </v-item>
                </div>
              </div>
            </v-item-group>
          </v-window-item>
          <v-window-item :value="2">-->
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
          <!-- </v-form>
          </v-window-item>
          <v-window-item :value="3">
            <v-form ref="form-step-3" lazy-validation>
              <Select
                v-model="user.school"
                label="School"
                :items="schoolNames"
                :rules="rules.school"
                name="school"
              >
              </Select>
              <TextField
                v-model="user.idNumber"
                :rules="rules.idNumber"
                label="ID Number"
                required
              >
              </TextField>
              <Select
                v-model="user.college"
                label="College"
                placeholder="College"
                :items="collegeList"
                item-text="text"
                item-value="abbr"
                outlined
                dense
                :rules="rules.college"
              />
              <Select
                v-show="user.userType === 'student'"
                v-model="user.program"
                label="Program"
                placeholder="Program"
                outlined
                dense
                :items="programList"
                item-text="text"
                :rules="
                  user.userType === 'student'
                    ? [(v) => !!v || 'Program is required']
                    : []
                "
              />
              <Select
                v-show="user.userType === 'student'"
                v-model="user.year"
                label="Year"
                placeholder="Year"
                outlined
                dense
                :items="year"
                :rules="
                  user.userType === 'student'
                    ? [(v) => !!v || 'Year is required']
                    : []
                "
              />
            </v-form>
          </v-window-item>
          <v-window-item :value="4"> -->
          <!-- <v-form ref="form-step-4" lazy-validation> -->
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

      <Button text block class="footer" :to="{ path: '/' }">
        I already have an account.
      </Button>
    </div>
  </div>
</template>

<script>
import COLLEGES from "@/assets/colleges.json";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import Select from "@/components/global/Select.vue";

import { mapActions } from "vuex";

export default {
  name: "Signin",
  components: {
    TextField,
    Button,
    Select,
  },
  data: function () {
    return {
      user: {},
      errors: [],
      isSubmit: false,
      rules: {
        firstName: [(v) => !!v || "Last Name is required"],
        lastName: [(v) => !!v || "First Name is required"],
        email: [(v) => !!v || "Email is required"],
        password: [
          (v) => !!v || "Password is required",
          (v) =>
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?).{8,}/.test(
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
  computed: {
    collegeList() {
      return COLLEGES;
    },
    programList() {
      return COLLEGES.reduce((total, current) => {
        if (current.abbr === this.user.college) {
          total = [...current.programs];
        }
        return total;
      }, []);
    },
    header() {
      switch (this.step) {
        case 1:
          return "I want to sign up as a...";
        case 2:
          return "Sign Up";
        case 3:
          return "School Credentials";
        default:
          return "Sign In Credentials";
      }
    },
    progresspassword() {
      let progress = this.passwordRules.reduce((accumulator, currentValue) => {
        let add = 0;
        if (currentValue.status === "200") add = 1;
        return accumulator + add;
      }, 0);
      return progress * 20;
    },
    colorpassword() {
      return ["error", "warning", "success"][
        Math.floor(this.progresspassword / 40)
      ];
    },
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
      if (/(?=.*[!@#$%^&*])/.test(this.user.password)) {
        this.passwordRules[4].status = "200";
      } else this.passwordRules[4].status = "500";
    },
  },
  methods: {
    toCapitalize(input = "") {
      return input
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    async signup() {
      console.log("signup", this.$refs);
      this.errors = [];
      this.isSubmit = true;
      if (this.$refs.form.validate()) {
        this.user.firstName = this.toCapitalize(this.user.firstName);
        this.user.lastName = this.toCapitalize(this.user.lastName);
        this.isSubmit = false;
      } else {
        console.log("Validation raised");
        this.isSubmit = false;
      }
    },
    ...mapActions({
      onRegister: "user/register",
    }),
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
.student-teacher-wrapper {
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 8px;
  .student-teacher-toggle {
    background-color: $primary;
    padding: 8px 0;
    color: white;
    text-align: center;
    border-radius: 4px;
    margin-top: 8px;
    transition-duration: 0.2s;
    &:hover {
      filter: brightness(1.025);
    }
  }
}
.v-window-item {
  padding-top: 10px;
  padding-bottom: 10px;
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
