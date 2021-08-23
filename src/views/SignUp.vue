<template>
  <div class="signup">
    <div class="grid-item-content">
      <span>logo</span>
      <v-form ref="form" lazy-validation @submit.prevent="signup">
        <v-row>
          <h2 class="title-signup mb-8">{{ header }}</h2>
        </v-row>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-item-group v-model="selectedUserType">
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
                        class="student-teacher-toggle"
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
          <v-window-item :value="2">
            <TextField v-model="user.firstName" label="First Name" required>
            </TextField>
            <TextField v-model="user.middleInitial" label="Middle Initial">
            </TextField>
            <TextField v-model="user.lastName" label="Last Name" required>
            </TextField>
          </v-window-item>
          <v-window-item :value="3">
            <Select
              label="School"
              :items="schoolNames"
              :rules="[(v) => !!v || 'School is required']"
              @change="
                ($event) => {
                  getSelectedSchoolId($event);
                }
              "
            >
            </Select>
            <TextField v-model="user.idNumber" label="ID Number" required>
            </TextField>
            <Select
              label="College"
              placeholder="College"
              outlined
              dense
              :items="collegeList"
              :rules="[(v) => !!v || 'College is required']"
              @change="
                ($event) => {
                  user.college = $event;
                  let x = collegeList.findIndex((c) => c.text === $event);
                  programList = collegeList[x].programs;
                }
              "
            />
            <Select
              v-show="user.userType === 'student'"
              label="Program"
              placeholder="Program"
              outlined
              dense
              :items="programList"
              :rules="
                user.userType === 'student'
                  ? [(v) => !!v || 'Program is required']
                  : []
              "
              @change="
                ($event) => {
                  user.program = $event;
                }
              "
            />
            <Select
              v-show="user.userType === 'student'"
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
              @change="
                ($event) => {
                  user.year = $event;
                }
              "
            />
          </v-window-item>
          <v-window-item :value="4">
            <TextField
              v-model="user.email"
              label="Institutional Email"
              required
            >
            </TextField>
            <template v-slot:activator="{}">
              <TextField
                v-model="user.password1"
                v-click-outside="password1TooltipClose"
                :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword1 ? 'text' : 'password'"
                name=""
                placeholder="Password"
                loading
                @click:append="showPassword1 = !showPassword1"
                @focus="password1Tooltip = !password1Tooltip"
              >
                <template v-slot:progress>
                  <v-progress-linear
                    :value="progressPassword1"
                    :color="colorPassword1"
                    absolute
                    height="7"
                  ></v-progress-linear>
                </template>
              </TextField>
            </template>
            <div>
              <ul class="password-rules">
                <li>Must contain the following:</li>
                <li
                  v-for="item in password1Rules"
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
          </v-window-item>
        </v-window>
        <!-- Start: Error Display -->
        <v-row>
          <v-col v-if="errors != null" class="text-center">
            <v-label v-for="(error, errorKey) in errors" :key="errorKey">
              {{ error[0].message }} <br />
            </v-label>
          </v-col>
        </v-row>
        <!-- End: Error Display -->
        <v-row class="px-1">
          <v-col>
            <v-btn
              v-show="step !== 1"
              class="btn-back"
              block
              text
              @click="step--"
            >
              Back
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <Button v-show="step !== 4" depressed block @click="nextStep()">
              Next
            </Button>
            <Button v-show="step === 4" :loading="isSubmit" @click="signup">
              Sign Up
            </Button>
          </v-col>
        </v-row>
      </v-form>
      <Button color="darkgrey" block outlined class="signin-microsoft">
        <v-avatar left>
          <v-img
            src="https://docs.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-azure-ad-apps/ms-symbollockup_mssymbol_19.svg"
            alt="Microsoft"
            contain
            height="25"
          />
        </v-avatar>
        Sign in with Microsoft
      </Button>
      <Button text block class="footer" :to="{ path: '/' }">
        I already have an account.
      </Button>
    </div>
  </div>
</template>

<script>
// TODO: Handle if school id already exists in the backend

import colleges from "@/assets/colleges.json";
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
      step: 4,
      user: {},
      selectedSchoolPk: null,
      schoolNames: [],
      schoolsFromServer: null,
      collegeList: colleges,
      programList: [],
      year: ["First", "Second", "Third", "Fourth", "Fifth"],
      errors: [],
      userType: [
        {
          name: "Student",
          img: require("@/assets/student.png"),
        },
        {
          name: "Teacher",
          img: require("@/assets/teacher.png"),
        },
      ],
      selectedUserType: null,
      isSubmit: false,
      password1Rules: [
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
  computed: {
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
    progressPassword1() {
      let progress = this.password1Rules.reduce((accumulator, currentValue) => {
        let add = 0;
        if (currentValue.status === "200") add = 1;
        return accumulator + add;
      }, 0);
      return progress * 20;
    },
    colorPassword1() {
      return ["error", "warning", "success"][
        Math.floor(this.progressPassword1 / 40)
      ];
    },
  },
  watch: {
    "user.password1": function () {
      if (this.user.password1.length >= 8) {
        this.password1Rules[0].status = "200";
      } else this.password1Rules[0].status = "500";
      if (/[a-z]/.test(this.user.password1)) {
        this.password1Rules[1].status = "200";
      } else this.password1Rules[1].status = "500";
      if (/[A-Z]/.test(this.user.password1)) {
        this.password1Rules[2].status = "200";
      } else this.password1Rules[2].status = "500";
      if (/\d/.test(this.user.password1)) {
        this.password1Rules[3].status = "200";
      } else this.password1Rules[3].status = "500";
      if (/(?=.*[!@#$%^&*])/.test(this.user.password1)) {
        this.password1Rules[4].status = "200";
      } else this.password1Rules[4].status = "500";
    },
    schoolsFromServer: function () {
      this.initialize();
    },
    selectedUserType() {
      this.user.userType = this.selectedUserType === 0 ? "student" : "adviser";
    },
  },
  methods: {
    nextStep() {
      console.log(this.step);
      if (this.step === 1) {
        if (this.selectedUserType) this.step++;
        else alert("Choose User");
      } else if (this.step === 2) {
        if (this.user.firstName && this.user.lastName) this.step++;
        else alert("Input Must not be empty");
      } else if (this.step === 3) {
        if (this.selectedSchoolPk && this.user.idNumber && this.user.college)
          this.step++;
        else alert("Input Must not be empty");
      }
    },
    password1TooltipClose() {
      this.password1Tooltip = false;
    },
    async signup() {
      this.errors = [];
      this.isSubmit = true;
      if (this.$refs.form.validate()) {
        this.user.username = this.user.email;
        const credentials = {
          ...this.user,
          isAdmin: false,
          school: this.selectedSchoolPk,
        };
        console.log({ credentials: credentials });
        const data = await this.onRegister(credentials);
        if (data.success == false) {
          console.log(data.errors);
          if ("username" in data.errors)
            data.errors.username[0].message = "Email already exists.";
          if ("idNumber" in data.errors)
            data.errors.schoolId[0].message = "ID Number already exists.";
          this.errors = data.errors;
          this.isSubmit = false;
        } else this.$router.push("/");
      } else {
        console.log("Validation raised");
        this.isSubmit = false;
      }
    },
    initialize() {
      this.schoolNames = [];
      this.schools = [];
      let schools = this.schoolsFromServer.edges;
      schools.forEach((value) => {
        var currentSchool = value.node;
        var tempSchool = {
          pk: currentSchool.pk,
          name: currentSchool.name,
        };
        this.schools.push(tempSchool);
        this.schoolNames.push(tempSchool.name);
      });
      console.log({ schools: this.schools });
    },
    getSelectedSchoolId(input) {
      let index = this.schools.findIndex((school) => school.name == input);
      this.selectedSchoolPk = this.schools[index].pk;
      console.log(this.selectedSchoolPk);
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
  // display: grid;
  // grid-template-rows: ;
  .v-text-field {
    background-color: white;
    margin-bottom: 20px !important;
  }
}
.password-rules {
  list-style-type: none;
  padding: 0;
  margin: 0;
  .password-rule {
    text-indent: 30px;
  }
}

// .title-signup {
//   text-align: left;
//   color: var(--v-primary);
// }
// .v-card {
//   margin: 4px;
// }
// .btn-next {
//   margin-top: 20px;
//   background-color: var(--v-primary) !important;
// }
// .btn-back {
//   margin-top: 20px;
//   color: var(--v-primary) !important;
// }
// .btn-signinwith {
//   margin-bottom: 20px;
// }
// .or {
//   margin: 0;
//   padding: 0;
//   justify-content: center;
// }
// a {
//   text-decoration: none;
//   &:hover {
//     text-decoration: underline;
//   }
// }
</style>
