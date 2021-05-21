<template>
  <div class="signin">
    <v-row class="wrap">
      <v-col lg="3" md="4" sm="6" cols="8">
        <v-form ref="form" lazy-validation @submit.prevent="signup">
          <v-row>
            <ImageLogo height="150px" width="200px" />
          </v-row>
          <v-row>
            <h2 class="title-signup mb-8">{{ header }}</h2>
          </v-row>
          <v-window v-model="step">
            <v-window-item :value="1" class="pa-4">
              <v-item-group v-model="selectedUserType">
                <v-row>
                  <v-col
                    v-for="(type, userIndex) in userType"
                    :key="userIndex"
                    cols="6"
                    class="pa-0"
                  >
                    <v-item v-slot="{ active, toggle }" class="m-0">
                      <v-card
                        flat
                        :color="active ? 'lightgrey2' : ''"
                        @click="toggle"
                      >
                        <v-img contain max-height="300" :src="type.img"></v-img>
                        <v-btn
                          id="selectStudent"
                          block
                          depressed
                          :color="active ? 'secondary' : 'primary'"
                          class="mt-4"
                        >
                          {{ type.name }}
                        </v-btn>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>
            </v-window-item>
            <v-window-item :value="2" class="pa-4">
              <v-row>
                <InputField
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      user.firstName = $event;
                    }
                  "
                />
              </v-row>
              <v-row>
                <InputField
                  label="Middle Initial"
                  placeholder="Middle Initial"
                  type="text"
                  :required="false"
                  @output="
                    ($event) => {
                      user.middleInitial = $event;
                    }
                  "
                />
              </v-row>
              <v-row>
                <InputField
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      user.lastName = $event;
                    }
                  "
                />
              </v-row>
            </v-window-item>
            <v-window-item :value="3" class="pa-4">
              <v-row>
                <v-select
                  outlined
                  dense
                  label="School"
                  placeholder="School"
                  :items="schoolNames"
                  :rules="[(v) => !!v || 'School is required']"
                  @change="
                    ($event) => {
                      getSelectedSchoolId($event);
                    }
                  "
                >
                </v-select>
              </v-row>
              <v-row>
                <InputField
                  label="ID Number"
                  placeholder="12-3456-789"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      user.idNumber = $event;
                    }
                  "
                />
              </v-row>
              <v-row>
                <v-select
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
              </v-row>
              <v-row>
                <v-select
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
              </v-row>
              <v-row>
                <v-select
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
              </v-row>
            </v-window-item>
            <v-window-item :value="4" class="pa-4">
              <v-row>
                <InputField
                  label="Institutional Email"
                  placeholder="firstname.lastname@cit.edu"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      user.email = $event;
                    }
                  "
                />
              </v-row>
              <v-row>
                <InputField
                  label="Password"
                  placeholder="••••••••••••"
                  type="password"
                  :required="true"
                  @output="
                    ($event) => {
                      user.password1 = $event;
                    }
                  "
                />
              </v-row>
              <v-row>
                <InputField
                  label="Confirm Password"
                  placeholder="••••••••••••"
                  type="password"
                  :required="true"
                  @output="
                    ($event) => {
                      user.password2 = $event;
                    }
                  "
                />
              </v-row>
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
              <v-btn
                v-show="step !== 4"
                class="btn-next"
                depressed
                block
                dark
                @click="step++"
              >
                Next
              </v-btn>
              <v-btn
                v-show="step === 4"
                class="btn-next"
                depressed
                block
                dark
                :loading="isSubmit"
                @click="signup"
              >
                Sign Up
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <!-- <v-row class="or"> or </v-row>

        <v-row class="px-4">
          <v-btn class="btn-signinwith" depressed block outlined>
            <v-img :src="require('@/assets/Google.svg')" height="18" contain />
            <span>Sign in with Google</span>
            <v-spacer />
          </v-btn>
        </v-row>

        <v-row class="px-4">
          <v-btn class="btn-signinwith" depressed block outlined>
            <v-img
              :src="require('@/assets/Microsoft.svg')"
              height="18"
              contain
            />
            <span>Sign in with Microsoft</span>
            <v-spacer />
          </v-btn>
        </v-row> -->

        <v-row class="mt-10" justify="center">
          <a href="/">I already have an account</a>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// TODO: Handle if school id already exists in the backend

import colleges from "@/assets/colleges.json";
import ImageLogo from "@/components/ImageLogo.vue";
import InputField from "@/components/InputField.vue";
import { mapActions } from "vuex";

import GET_SCHOOLS from "@/graphql/queries/get-schools-for-registration.gql";

export default {
  name: "Signin",
  components: {
    ImageLogo,
    InputField,
  },
  data: function () {
    return {
      step: 1,
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
  },
  watch: {
    schoolsFromServer: function () {
      this.initialize();
    },
    selectedUserType() {
      this.user.userType = this.selectedUserType === 0 ? "student" : "adviser";
    },
  },
  apollo: {
    schoolsFromServer: {
      query: GET_SCHOOLS,
      update: (data) => data.schools,
    },
  },
  methods: {
    async signup() {
      console.log("signup");
      console.log(this.user);
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
.wrap {
  justify-content: center;
}
.signin {
  margin: 50px 0px;
}
.title-signup {
  text-align: left;
  color: var(--v-primary);
}
.v-card {
  margin: 4px;
}
.btn-next {
  margin-top: 20px;
  background-color: var(--v-primary) !important;
}
.btn-back {
  margin-top: 20px;
  color: var(--v-primary) !important;
}
.btn-signinwith {
  margin-bottom: 20px;
}
.or {
  margin: 0;
  padding: 0;
  justify-content: center;
}
a {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
