<template>
  <div class="signin">
    <v-row class="wrap">
      <v-col lg="3" md="4" sm="6" cols="8">
        <v-form ref="form" lazy-validation @submit.prevent="signup">
          <v-row>
            <ImageLogo height="150px" width="200px" />
          </v-row>
          <v-row>
            <h2 class="title-signup">{{ header }}</h2>
          </v-row>
          <v-window v-model="step">
            <v-window-item :value="1" class="pa-4">
              <v-row>
                <InputField
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      this.user.firstname = $event;
                    }
                  "
                />
              </v-row>
              <v-row>
                <InputField
                  label="Middle Name"
                  placeholder="Middle Name"
                  type="text"
                  :required="false"
                  @output="
                    ($event) => {
                      this.user.middlename = $event;
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
                      this.user.lastname = $event;
                    }
                  "
                />
              </v-row>
            </v-window-item>
            <v-window-item :value="2" class="pa-4">
              <v-row>
                <!-- <InputField
                  label="School"
                  placeholder="School"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      this.user.school = $event;
                    }
                  "
                /> -->
                <v-select
                  v-model="user.school"
                  :items="schools"
                  :rules="[(v) => !!v || 'School is required']"
                  label="School"
                  required
                ></v-select>
              </v-row>
              <v-row>
                <InputField
                  label="ID Number"
                  placeholder="12-3456-789"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      this.user.idnumber = $event;
                    }
                  "
                />
              </v-row>
              <v-row>
                <InputField
                  label="College"
                  placeholder="College"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      this.user.college = $event;
                    }
                  "
                />
              </v-row>
              <v-row>
                <v-col class="pl-0 py-0">
                  <InputField
                    label="Program"
                    placeholder="Program"
                    type="text"
                    :required="true"
                    @output="
                      ($event) => {
                        this.user.program = $event;
                      }
                    "
                  />
                </v-col>
                <v-col class="pr-0 py-0">
                  <InputField
                    label="Year"
                    placeholder="Year"
                    type="text"
                    :required="true"
                    @output="
                      ($event) => {
                        this.user.year = $event;
                      }
                    "
                  />
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="3" class="pa-4">
              <v-row>
                <InputField
                  label="Institutional Email"
                  placeholder="firstname.lastname@cit.edu"
                  type="text"
                  :required="true"
                  @output="
                    ($event) => {
                      this.user.email = $event;
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
                      this.user.password = $event;
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
                      this.user.password2 = $event;
                    }
                  "
                />
              </v-row>
            </v-window-item>
          </v-window>
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
                v-show="step !== 3"
                class="btn-next"
                depressed
                block
                dark
                @click="step++"
              >
                Next
              </v-btn>
              <v-btn
                v-show="step === 3"
                class="btn-next"
                depressed
                block
                dark
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
      schools: [],
      schoolsFromServer: null,
    };
  },
  computed: {
    header() {
      switch (this.step) {
        case 1:
          return "Sign Up";
        case 2:
          return "School Credentials";
        default:
          return "Sign In Credentials";
      }
    },
  },
  watch: {
    schoolsFromServer: function () {
      this.initialize()
    }
  },
  apollo: {
    schoolsFromServer: {
      query: GET_SCHOOLS,
      update: data => data.schools,
    },
  },
  methods: {
    signup() {
      console.log("signup");
      // remove password 2 on POST
      console.log(this.user);
    },
    initialize(){
      this.schools = []
      let schools = this.schoolsFromServer.edges;
      schools.forEach((value) => {
        var currentSchool = value.node
        var tempSchool = {
          id: currentSchool.id,
          name: currentSchool.name,
        }
        this.schools.push(tempSchool)
      }) 
      // console.log(this.schools)
    }
  },
  ...mapActions({
    onRegister: 'user/register'
  })
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
