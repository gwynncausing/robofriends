<template>
  <div>
    <AppBar />
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
                  <h4>Account Type</h4>
                  <p class="subheading1 text-neutral-500">
                    Choose how you want to use Bud.
                  </p>
                </div>
                <v-item-group>
                  <div class="student-teacher-wrapper">
                    <div v-for="(type, userIndex) in userType" :key="userIndex">
                      <v-item v-slot="{ active }">
                        <v-card
                          flat
                          :color="active ? 'neutral-50' : ''"
                          class="student-teacher"
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
                  <h4>School Details</h4>
                  <p class="subheading1 text-neutral-500">
                    Access groups and researches from your school.
                  </p>
                </div>
                <Select
                  v-model="user.school"
                  label="School"
                  name="school"
                  :items="schoolNames"
                  :rules="rules.school"
                />
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

                <div class="program-year">
                  <Select
                    v-show="user.userType === 'Student'"
                    v-model="user.program"
                    label="Program"
                    placeholder="Program"
                    outlined
                    dense
                    :items="programList"
                    item-text="text"
                    :rules="
                      user.userType === 'Student'
                        ? [(v) => !!v || 'Program is required']
                        : []
                    "
                    class="program"
                  />

                  <Select
                    v-show="user.userType === 'Student'"
                    v-model="user.year"
                    label="Year"
                    placeholder="Year"
                    outlined
                    dense
                    :items="year"
                    :rules="
                      user.userType === 'Student'
                        ? [(v) => !!v || 'Year is required']
                        : []
                    "
                    class="year"
                  />
                </div>
                <TextField
                  v-model="user.idNumber"
                  :rules="rules.idNumber"
                  label="ID Number"
                  required
                />

                <div class="d-flex justify-space-between">
                  <Button text @click="prevStep()"> Back </Button>
                  <Button @click="completeOnboarding()"> Submit </Button>
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
import COLLEGES from "@/assets/colleges.json";
import Select from "@/components/global/Select.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import AppBar from "@/components/AppBar.vue";
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
      valid: false,
      show: true,
      step: 1,
      chooseUserTypeClick: true,
      user: {},
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
      schoolNames: ["CIT", "UC", "USJR"],
      year: ["First", "Second", "Third", "Fourth", "Fifth"],
      rules: {
        idNumber: [(v) => !!v || "ID Number is required"],
        school: [(v) => !!v || "School is required"],
        college: [(v) => !!v || "College is required"],
        Program: [(v) => !!v || "Program is required"],
      },
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
  },

  watch: {
    step(newVal) {
      if (newVal != 1) return;
      this.chooseUserTypeClick = true;
    },
  },

  created() {
    console.log("Onboarding Started");
  },

  methods: {
    selectUserType(item) {
      this.chooseUserTypeClick = false;
      this.user.userType = item;
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
    completeOnboarding() {
      if (!this.$refs["onboarding-form"].validate()) return;
      console.log("complete onboarding");
    },
  },
};
</script>

<style lang="scss" scoped>
#onboarding {
  text-align: -webkit-center;
  margin: clamp(30px, 7vw, 50px) 20px 20px 20px !important;
  // margin: 20px;
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

.program-year {
  display: grid;
  grid-template-columns: calc(50% - 5px) calc(50% - 5px);
  gap: 10px;
  .program,
  .year {
    max-width: 100%;
  }
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
