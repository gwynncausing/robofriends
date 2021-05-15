<template>
  <v-responsive class="first-login-stepper">
    <v-stepper v-model="currentStep" alt-labels class="elevation-0">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="currentStep > 1">
          Create Team
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2" :complete="currentStep > 2">
          Invite Team
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Start Project </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- STEP 1 -->
        <v-stepper-content step="1">
          <div class="mb-12">
            <div class="d-flex">
              <span class="text">Team Name</span>
              <InputField
                placeholder="Team Name"
                @output="
                  ($event) => {
                    project.teamname = $event;
                  }
                "
              />
            </div>
            <div
              v-for="(item, colorIndex) in project.theme"
              :key="colorIndex"
              class="color-wrapper d-flex"
            >
              <span class="text">Primary</span>
              <Button class="mr-4" :color="item" />
              <InputField class="mr-4" :text="item" />
              <InputField :text="item" />
            </div>
            <div class="recommended-colors-wrapper">
              <span class="text">Recommended Colors:</span>
              <Button color="red" class="mr-4" />
              <Button color="blue" class="mr-4" />
              <Button color="yellow" class="mr-4" />
            </div>
          </div>

          <div class="d-flex">
            <Button color="primary" class="ml-auto" @click="currentStep = 2">
              Continue
            </Button>
          </div>
        </v-stepper-content>

        <!-- STEP 2 -->
        <v-stepper-content step="2">
          <div class="mb-12">
            <div class="d-flex">
              <span class="text start-project-text">Adviser:</span>
              <SelectField
                :items="advisers"
                multiple
                chips
                placeholder="Adviser"
                @output="inputAdviserDetails($event, '0')"
              />
            </div>
            <div class="d-flex">
              <span class="text start-project-text"> Member 1: </span>
              <v-text-field
                v-model="project.members[0]"
                outlined
                dense
                type="email"
                @change="isMemberEmpty(0)"
              ></v-text-field>
            </div>
            <div
              v-for="(member, memberIndex) in project.members"
              :key="memberIndex"
              class="d-flex"
            >
              <span class="text start-project-text">
                Member {{ memberIndex + 2 }}:
              </span>
              <v-text-field
                v-model="project.members[memberIndex + 1]"
                outlined
                dense
                type="email"
                @change="isMemberEmpty(memberIndex + 1)"
              ></v-text-field>
            </div>
          </div>

          <div class="d-flex">
            <Button text @click="currentStep = 1"> Back </Button>

            <v-dialog v-model="inviteDialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  class="ml-auto"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Invite
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline secondary lighten-4">
                  Team Invitation
                </v-card-title>

                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                  <div class="mt-4">
                    When you accept you will not be able to go back in this
                    step, although you can invite or change your settings after
                    step 3.
                  </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    type="submit"
                    @click="[(inviteDialog = false), invite()]"
                  >
                    I accept
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- <Button color="primary" class="ml-auto" @click="invite">
              Invite
            </Button> -->
          </div>
        </v-stepper-content>

        <!-- STEP 3 -->
        <v-stepper-content step="3">
          <div class="mb-12">
            <div class="d-flex">
              <span class="text">Title</span>
              <InputField
                placeholder="Title"
                @output="
                  ($event) => {
                    project.title = $event;
                  }
                "
              />
            </div>
            <div>
              <div class="text mb-2">Brief Description</div>
              <v-textarea outlined rows="4"> </v-textarea>
            </div>
            <div class="mb-8">
              <span class="text mb-2">Objectives</span>
              <div class="d-flex mt-3">
                <v-text-field
                  v-model="project.objectives[0]"
                  placeholder="Objective"
                  outlined
                  dense
                  hide-details
                  @change="isObjectiveEmpty(0)"
                ></v-text-field>
              </div>
              <div
                v-for="(proj, projectIndex) in project.objectives"
                :key="projectIndex + 50"
                class="d-flex mt-3"
              >
                <v-text-field
                  v-model="project.objectives[projectIndex + 1]"
                  placeholder="Objective"
                  outlined
                  dense
                  hide-details
                  @change="isObjectiveEmpty(projectIndex + 1)"
                ></v-text-field>
              </div>
            </div>
            <div>
              <span class="text mb-2">Category</span>
              <v-combobox
                outlined
                :v-model="project.category"
                :items="category"
                label="Category"
                multiple
                dense
                chips
                deletable-chips
              ></v-combobox>
            </div>
          </div>

          <div class="d-flex">
            <Button text> Guidelines</Button>
            <Button color="primary" class="ml-auto" @click="submit">
              Submit
            </Button>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-responsive>
</template>

<script>
import SelectField from "@/components/SelectField.vue";
import InputField from "@/components/InputField.vue";
import Button from "@/components/Button.vue";

export default {
  name: "DashboardFirstLoginStepper",
  components: { SelectField, InputField, Button },
  data() {
    return {
      inviteDialog: false,
      currentStep: 1,
      // TODO: Check if the there is a team created, then make currentStep value to 3
      steps: 3,
      project: {
        theme: {
          primaryColor: "#34C387",
          secondaryColor: "#34C387",
          tertiaryColor: "#34C387",
        },
        advisers: [],
        members: [],
        objectives: [],
      },
      advisers: ["Leah Barbaso", "Mang Juan", "Mang Tooh", "Mang Teii"],
      category: [
        "Project Manager",
        "Frontend Dev",
        "Backend Dev",
        "UI/UX Designer",
      ],
    };
  },

  watch: {
    steps(val) {
      if (this.currentStep > val) {
        this.currentStep = val;
      }
    },
  },

  methods: {
    isObjectiveEmpty(index) {
      console.log(this.project.objectives);
      if (this.project.objectives[index] == "")
        this.project.objectives.splice(index, 1);
    },
    isMemberEmpty(index) {
      console.log(this.project.members);
      if (this.project.members[index] == "")
        this.project.members.splice(index, 1);
    },
    inputAdviserDetails(event, index) {
      this.project.advisers[index]
        ? (this.project.advisers[index] = event)
        : this.project.advisers.push(event);
    },
    nextStep(n) {
      console.log("next step", n, this.steps);
      if (n === this.steps) {
        this.currentStep = 1;
      } else {
        this.currentStep = n + 1;
      }
    },
    invite() {
      this.currentStep = 3;
      console.log("invite");
    },
    submit() {
      console.log("submit");
    },
  },
};
</script>

<style lang="scss" scoped>
.first-login-stepper {
  // background-color: var(--v-lightgrey2);
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.v-stepper__header {
  box-shadow: none;
  background-color: var(--v-lightgrey2);
  border-radius: 10px;
  padding: 10px;
}
.v-stepper__items {
  background-color: var(--v-lightgrey2);
  border-radius: 10px;
  padding: 20px;
  margin-top: 18px;
}
.theme--light.v-stepper {
  background: transparent !important;
}
.text {
  margin-top: 8px;
  margin-right: 20px;
}
.start-project-text {
  min-width: 90px;
}
.color-wrapper {
  max-width: 500px;
}
</style>
