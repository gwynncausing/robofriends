<template>
  <div>
    <AppBar
      :routes="appBar.routes"
      :notifications="appBar.notifications"
      :user="appBar.user"
      @logout="appBar.logout"
    />
    <div id="onboarding">
      <div class="onboarding-wrapper">
        <div class="grid-item-content">
          <v-form
            ref="onboarding-form"
            lazy-validation
            @submit.prevent="finishOnboarding()"
          >
            <transition name="slide-fade">
              <div v-if="step == 1">
                <div class="step-title">
                  <h4>Welcome to Bud!</h4>
                  <p class="subheading1 neutral-500--text">
                    Choose how you want to use Bud.
                  </p>
                </div>
                <v-item-group>
                  <div class="student-teacher-wrapper">
                    <div v-for="(type, userIndex) in userType" :key="userIndex">
                      <v-item v-slot="{ active }">
                        <v-card
                          class="student-teacher"
                          flat
                          :color="active ? 'neutral-50' : ''"
                          @click="
                            chooseUserTypeClick
                              ? { click: selectUserType(type.name) }
                              : {}
                          "
                        >
                          <v-img
                            contain
                            max-height="250px"
                            :src="type.img"
                          ></v-img>
                          <div
                            class="student-teacher-toggle button-font"
                            :class="
                              type.name === 'Teacher' ? 'secondary' : 'primary'
                            "
                          >
                            {{ type.name }}
                          </div>
                        </v-card>
                      </v-item>
                    </div>
                  </div>
                </v-item-group>
              </div>
            </transition>
            <transition name="slide-fade">
              <div v-if="step == 2">
                <div class="step-title">
                  <h4>Your School Details</h4>
                  <p class="subheading1 neutral-500--text">
                    Access groups and researches from your school.
                  </p>
                </div>
                <Select
                  v-model="user.schoolId"
                  label="School"
                  name="school"
                  item-text="name"
                  item-value="id"
                  :items="schools"
                  :rules="rules.schoolId"
                />
                <Select
                  v-model="user.collegeId"
                  label="College"
                  name="college"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                  :items="colleges"
                  :rules="rules.collegeId"
                />
                <Select
                  v-show="user.type === 'Student'"
                  v-model="user.program"
                  label="Program"
                  name="program"
                  outlined
                  dense
                  class="program"
                  :items="programs"
                  :rules="
                    user.type === 'Student'
                      ? [(v) => !!v || 'Program is required']
                      : []
                  "
                />
                <TextField
                  v-model="user.idNumber"
                  label="ID Number"
                  name="id-number"
                  :rules="rules.idNumber"
                />
                <div v-if="error" class="errors">
                  {{ error }}
                </div>
                <div class="d-flex justify-space-between">
                  <Button text @click="prevStep()"> Back </Button>
                  <Button :loading="isSubmit" @click="completeOnboarding()">
                    Submit
                  </Button>
                </div>
              </div>
            </transition>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "@/components/global/Select.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import AppBar from "@/components/AppBar.vue";

import { mapActions, mapGetters } from "vuex";
import { ROOT_ACTIONS } from "@/store/types/actions";
import { ROOT_GETTERS } from "@/store/types/getters";
import { USER } from "@/utils/constants/user";
import { STATUS_CODES } from "@/utils/constants/http-status-codes";

export default {
  name: "OnboardingAccountType",
  components: {
    Select,
    TextField,
    Button,
    AppBar,
  },
  data() {
    return {
      appBar: {
        user: {
          name: "Unknown",
          profile: "",
          image:
            "https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg",
        },
        routes: [
          {
            name: "Archive",
            path: { name: "Archive" },
          },
        ],
        notifications: [
          {
            name: "Notification 1",
            details: "",
            path: "",
          },
        ],
      },
      isSubmit: false,
      valid: false,
      show: true,
      step: 1,
      chooseUserTypeClick: true,
      user: {},
      error: "",
      userType: [
        {
          name: "Student",
          img: require("@/assets/student.svg"),
        },
        {
          name: "Teacher",
          img: require("@/assets/teacher.svg"),
        },
      ],
      schools: ["CIT", "UC", "USJR"],
      colleges: [],
      programs: [],
      rules: {
        idNumber: [(v) => !!v || "ID Number is required"],
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
    step(newVal) {
      if (newVal != 1) return;
      this.chooseUserTypeClick = true;
    },
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
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    ...mapActions({
      onFetchSchools: ROOT_ACTIONS.FETCH_SCHOOLS,
      onOnboardUser: ROOT_ACTIONS.ONBOARD_USER,
    }),
    logout() {
      console.log("Logout User");
    },
    async fetchSchools() {
      try {
        await this.onFetchSchools();
        this.schools = this.getSchools;
      } catch (error) {
        console.log(error);
      }
    },
    selectUserType(item) {
      this.chooseUserTypeClick = false;
      this.user.type = item;
      this.nextStep();
    },
    nextStep() {
      setTimeout(() => {
        this.step += 0.5;
      }, 500);
      setTimeout(() => {
        this.step += 0.5;
      }, 1300);
    },
    prevStep() {
      this.step -= 0.5;
      setTimeout(() => {
        this.step -= 0.5;
      }, 800);
    },
    async completeOnboarding() {
      if (!this.$refs["onboarding-form"].validate()) return;
      try {
        this.isSubmit = true;
        const payload = {
          id: this.getUser.id,
          user: {
            ...this.user,
            type:
              this.user.type === "Student"
                ? USER.TYPES.STUDENT
                : USER.TYPES.TEACHER,
            firstName: this.getUser.firstName,
            lastName: this.getUser.lastName,
          },
        };
        //TODO: temporary solution for the error if user is teacher, inform backend later
        if (this.user.type === "Teacher")
          payload.user.program = this.programs[0];
        await this.onOnboardUser(payload);
        switch (this.getUserType) {
          case USER.TYPES.STUDENT:
            this.$router.replace({ name: "Dashboard" });
            break;
          case USER.TYPES.TEACHER:
            //TODO: change to teacher dashboard route
            console.log("Redirect to teacher's dashboard");
            break;
          default:
            console.log("Default");
            break;
        }
      } catch (error) {
        switch (error?.response?.status) {
          case STATUS_CODES.ERRORS.BAD_REQUEST:
            this.error = "ID number is already taken";
            break;
          default:
            break;
        }
      } finally {
        this.isSubmit = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#onboarding {
  text-align: -webkit-center;
  margin: clamp(56px, 7vw, 96px) 20px 20px 20px !important;
}
.onboarding-wrapper {
  max-width: 421px;
  .grid-item-content {
    grid-column: 1 / 5;
    height: fit-content;
  }
}
.step-title {
  text-align: left;
  margin-bottom: 48px;
}
.student-teacher-wrapper {
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 8px;
  .student-teacher {
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: var(--v-neutral-100);
    }
  }
  .student-teacher .student-teacher-toggle {
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
.errors {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: var(--v-error);
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
  // cubic-bezier(1, 0.5, 0.8, 1)
}
.slide-fade-enter {
  transform: translatey(50px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translatey(-50px);
  opacity: 0;
}
</style>
