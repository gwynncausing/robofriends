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
                @output="
                  ($event) => {
                    project.teamName = $event;
                  }
                "
              />
            </div>
            <div
              v-for="(item, colorIndex, colorIndexNumber) in project.theme"
              :key="colorIndex"
              class="color-wrapper"
            >
              <span class="text">{{ colors[colorIndexNumber] }}: </span>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :color="project.theme[colorIndex]"
                    dark
                    class="mr-4"
                    depressed
                    v-on="on"
                  ></v-btn>
                </template>
                <v-color-picker
                  v-model="project.theme[colorIndex]"
                  value="primary"
                  hide-inputs
                  class="mx-auto"
                ></v-color-picker>
              </v-menu>
              <v-text-field
                v-model="project.theme[colorIndex]"
                outlined
                dense
                hide-details
              ></v-text-field>
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
              <!-- <SelectField
                :items="advisers"
                itemText="fullName"
                itemValue="email"
                multiple
                chips
                @output="inputAdviserDetails($event, '0')"
              /> -->
              <v-select
                multiple
                outlined
                dense
                :items="advisers"
                item-text="fullName"
                item-value="email"
                @change="
                  ($event) => {
                    inputAdviserDetails($event);
                  }
                "
              >
              </v-select>
            </div>
            <div class="d-flex">
              <span class="text start-project-text"> Member 1: </span>
              <v-text-field
                outlined
                dense
                type="email"
                :value="getUser.email"
                readonly
              ></v-text-field>
            </div>
            <div class="d-flex">
              <span class="text start-project-text"> Member 2: </span>
              <v-text-field
                v-model="project.invitedEmails[0]"
                outlined
                dense
                type="email"
                @change="isMemberEmpty(0)"
              ></v-text-field>
            </div>
            <div
              v-for="(email, emailIndex) in project.invitedEmails"
              :key="emailIndex"
              class="d-flex"
            >
              <span class="text start-project-text">
                Member {{ emailIndex + 2 }}:
              </span>
              <v-text-field
                v-model="project.invitedEmails[emailIndex + 1]"
                outlined
                dense
                type="email"
                @change="isMemberEmpty(emailIndex + 1)"
              ></v-text-field>
            </div>
          </div>

          <div class="d-flex">
            <Button text @click="currentStep = 1"> Back </Button>

            <Button color="primary" class="ml-auto" @click="currentStep = 3">
              Continue
            </Button>
          </div>
        </v-stepper-content>

        <!-- STEP 3 -->
        <v-stepper-content step="3">
          <div class="mb-12">
            <div class="d-flex">
              <span class="text">Title</span>
              <InputField
                @output="
                  ($event) => {
                    project.title = $event;
                  }
                "
              />
            </div>
            <div>
              <div class="text mb-2">Brief Description</div>
              <v-textarea v-model="project.description" outlined rows="4">
              </v-textarea>
            </div>
            <div class="mb-8">
              <span class="text mb-2">Objectives</span>
              <div class="d-flex mt-3">
                <v-text-field
                  v-model="project.objectives[0]"
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
                v-model="project.categories"
                outlined
                :items="category"
                multiple
                dense
                chips
                deletable-chips
              ></v-combobox>
            </div>
          </div>

          <div class="d-flex">
            <Button text @click="currentStep = 2"> Back </Button>
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
import InputField from "@/components/InputField.vue";
import Button from "@/components/Button.vue";

import GET_ADVISERS from "@/graphql/queries/get-advisers.gql";
import CREATE_PROJECT from "@/graphql/mutations/create-project.gql";

import { mapGetters } from "vuex";

export default {
  name: "DashboardFirstLoginStepper",
  components: { InputField, Button },
  data() {
    return {
      inviteDialog: false,
      currentStep: 1,
      // TODO: Check if the there is a team created, then make currentStep value to 3
      steps: 3,
      advisersNames: [],
      project: {
        title: "",
        description: "",
        teamName: "",
        theme: {
          primaryColor: "#34C387",
          secondaryColor: "#F16F82",
          tertiaryColor: "#1F724F",
        },
        // TODO: to be removed, will now use invited emails
        advisers: [],
        // members: [],
        invitedEmails: [],
        objectives: [],
        categories: [],
      },
      // TODO: query for adviser's name and email
      advisers: [],
      category: [
        "Artificial Intelligence",
        "Cary lang Sakalam",
        "Data Analytics",
        "Automation",
        "Internet of Things",
      ],
      colors: ["Primary", "Secondary", "Tertiary"],
    };
  },

  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },

  watch: {
    steps(val) {
      if (this.currentStep > val) {
        this.currentStep = val;
      }
    },
    // advisers: function () {
    //   this.setAdviserNames();
    // },
  },

  apollo: {
    advisers: {
      query: GET_ADVISERS,
      update: (data) => data.users.edges.map((edge) => edge.node),
    },
  },

  methods: {
    setAdviserNames() {
      this.advisersNames = [];
      let advisers = this.advisers;
      advisers.forEach((adviser) => {
        this.advisersNames.push(adviser.fullName);
      });
    },
    colorPick(hex, index) {
      console.log(hex, index);
      this.project.theme[index] = hex;
    },
    isObjectiveEmpty(index) {
      console.log(this.project.objectives);
      if (this.project.objectives[index] == "")
        this.project.objectives.splice(index, 1);
    },
    isMemberEmpty(index) {
      console.log(this.project.invitedEmails);
      if (this.project.invitedEmails[index] == "")
        this.project.invitedEmails.splice(index, 1);
    },
    inputAdviserDetails(event) {
      this.project.advisers = event;
      console.log(this.project.advisers);
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
      //TODO: call create project mutation
      this.$apollo.mutate({
        mutation: CREATE_PROJECT,
        variables: { input: this.project },
      });
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
  min-width: 90px;
}
.start-project-text {
  min-width: 90px;
}
.color-wrapper {
  max-width: 325px;
  margin-top: 10px;
  display: flex;
}
.recommended-colors-wrapper {
  margin-top: 20px;
}
</style>
