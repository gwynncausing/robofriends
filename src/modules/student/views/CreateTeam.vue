<template>
  <div class="create-team-stepper">
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

        <v-stepper-step step="3" :complete="currentStep > 3">
          Start Project
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- STEP 1 -->
        <v-stepper-content step="1">
          <div class="create-team">
            <div class="label-header">Create Team</div>
            <div class="label-sm">Team Name</div>
            <div class="d-flex">
              <span class="label label-md">Team Name</span>
              <v-text-field
                v-model="project.teamName"
                outlined
                dense
                hide-details
                placeholder="Team Name"
              ></v-text-field>
            </div>

            <div class="colors">
              <div class="color-preview">
                <div id="preview-navbar"></div>
                <div id="preview-content"></div>
                <div id="preview-sidebar"></div>
              </div>

              <div>
                <div
                  v-for="(item, colorIndex, colorIndexNumber) in project.theme"
                  :key="colorIndex"
                  class="color-wrapper"
                >
                  <span class="label">{{ colors[colorIndexNumber] }}</span>
                  <v-menu offset-y :close-on-content-click="false">
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
              </div>
            </div>

            <div class="recommended-colors-wrapper">
              <span class="label">Recommended Colors:</span>
              <div>
                <v-btn
                  depressed
                  class="recommended-color"
                  @click="
                    [
                      (project.theme.primaryColor = '#34C387FF'),
                      (project.theme.secondaryColor = '#F16F82FF'),
                      (project.theme.tertiaryColor = '#1F724FFF'),
                    ]
                  "
                >
                  <span class="color-circle primary"></span>
                  <span class="color-circle secondary"></span>
                  <span class="color-circle tertiary"></span>
                </v-btn>
                <v-btn
                  depressed
                  class="recommended-color"
                  @click="
                    [
                      (project.theme.primaryColor = '#FF5252FF'),
                      (project.theme.secondaryColor = '#4CAF50FF'),
                      (project.theme.tertiaryColor = '#2196F3FF'),
                    ]
                  "
                >
                  <span class="color-circle error"></span>
                  <span class="color-circle success"></span>
                  <span class="color-circle info"></span>
                </v-btn>
              </div>
            </div>

            <div id="create-team-error-section" class="errors">
              {{ createTeamError }}
            </div>

            <div class="action-section">
              <v-btn
                depressed
                color="primary"
                class="ml-auto"
                @click="createTeamEvaluate()"
              >
                Continue
              </v-btn>
              <!-- createTeamEvaluate -->
              <!-- @click="currentStep = 2" -->
            </div>
          </div>
        </v-stepper-content>

        <!-- STEP 2 -->
        <v-stepper-content step="2">
          <div class="invite-team">
            <div class="label-header">Invite Team</div>
            <div class="adviser-member-wrapper">
              <div class="label-sm">Advisers</div>
              <div class="d-flex">
                <span class="label label-md">Advisers</span>
                <v-select
                  v-model="project.advisers"
                  multiple
                  outlined
                  dense
                  hide-details
                  chips
                  placeholder="Adviser"
                  :items="advisers"
                  item-text="fullName"
                  item-value="email"
                >
                </v-select>
              </div>
              <div class="label-sm">Members</div>
              <div class="d-flex">
                <span class="label label-md"> Member 1</span>
                <v-text-field
                  outlined
                  dense
                  hide-details
                  type="email"
                  value="getUser.email"
                  placeholder="Member 1"
                  readonly
                ></v-text-field>
              </div>
              <div class="d-flex">
                <span class="label label-md"> Member 2</span>
                <v-text-field
                  v-model="project.invitedEmails[0]"
                  outlined
                  dense
                  hide-details
                  placeholder="Member 2"
                  type="email"
                  @change="isMemberEmpty(0)"
                ></v-text-field>
              </div>
              <div
                v-for="(email, emailIndex) in project.invitedEmails"
                :key="emailIndex"
                class="d-flex"
              >
                <span class="label label-md">
                  Member {{ emailIndex + 2 }}
                </span>
                <v-text-field
                  v-model="project.invitedEmails[emailIndex + 1]"
                  outlined
                  dense
                  hide-details
                  :placeholder="`Member ${emailIndex + 3}`"
                  type="email"
                  @change="isMemberEmpty(emailIndex + 1)"
                ></v-text-field>
              </div>
              <div>
                <em><small> Note: You can invite members later. </small></em>
              </div>
            </div>

            <div id="invite-team-error-section" class="errors">
              {{ inviteTeamError }}
            </div>

            <div class="action-section mt-auto">
              <v-btn text @click="currentStep = 1"> Back </v-btn>

              <v-btn
                depressed
                color="primary"
                class="ml-auto"
                @click="inviteTeamEvaluate"
              >
                Continue
              </v-btn>
            </div>
          </div>
        </v-stepper-content>

        <!-- STEP 3 -->
        <v-stepper-content step="3">
          <div class="start-project">
            <div class="label-header">Start Project</div>
            <div class="label-sm">Title</div>
            <div class="d-flex">
              <span class="label label-md">Title</span>
              <v-text-field
                v-model="project.title"
                hide-details
                outlined
                dense
              ></v-text-field>
            </div>

            <div>
              <div class="label">Brief Description</div>
              <v-textarea
                v-model="project.description"
                outlined
                hide-details
                rows="4"
              >
              </v-textarea>
            </div>

            <div>
              <div>
                <div class="label">Objectives</div>
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
                class="d-flex"
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
              <div class="label">Category</div>
              <v-combobox
                v-model="project.categories"
                outlined
                :items="category"
                multiple
                hide-details
                dense
                chips
                deletable-chips
              ></v-combobox>
            </div>

            <div id="start-project-error-section" class="errors">
              {{ startProjectError }}
            </div>

            <div class="action-section">
              <v-btn text @click="currentStep = 2"> Back </v-btn>
              <v-btn
                depressed
                color="primary"
                class="ml-auto"
                :loading="isSubmit"
                @click="submit"
              >
                Submit
              </v-btn>
            </div>
          </div>
        </v-stepper-content>

        <!-- STEP 4 -->
        <v-stepper-content step="4">
          <div class="mb-12 yaaaay-wrapper">
            <v-img
              :src="require('@/assets/Yaaaay.svg')"
              height="300"
              contain
              class="yaaaay"
            ></v-img>
            <div class="text-details">
              <span class="heading">
                <span>Yaaaay! </span>
              </span>
              <p class="details">
                You just submitted your project for approval. <br />
                You can plan ahead or just chill while you wait. ;&#41;
              </p>
            </div>
          </div>

          <div class="text-center">
            <v-btn color="primary" text @click="() => this.$router.go(0)">
              Click here to continue
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "CreateTeam",
  data() {
    return {
      createTeamError: "",
      inviteTeamError: "",
      startProjectError: " ",
      inviteDialog: false,
      currentStep: 1,
      steps: 4,
      project: {
        title: "",
        description: "",
        teamName: "",
        // TODO: to be removed, will now use invited emails
        advisers: [],
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
      isSubmit: false,
    };
  },

  computed: {
    // ...mapGetters({
    //   getUser: "user/getUser",
    // }),
  },

  watch: {
    steps(val) {
      if (this.currentStep > val) {
        this.currentStep = val;
      }
    },
    "project.teamName": function () {
      if (this.project.teamName) this.createTeamError = "";
    },
    "project.advisers": function () {
      if (this.project.advisers.length) this.inviteTeamError = "";
    },
  },

  methods: {
    createTeamEvaluate() {
      if (this.project.teamName) {
        this.createTeamError = "";
        this.currentStep++;
      } else this.createTeamError = "Team Name must not be empty";
    },
    inviteTeamEvaluate() {
      if (this.project.advisers.length) {
        this.inviteTeamError = "";
        this.currentStep++;
      } else this.inviteTeamError = "Must have at least one adviser";
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
    submit() {
      console.log("submit");
      this.isSubmit = true;

      //TODO: call create project mutation
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
}
.create-team-stepper {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  min-width: 360px;
  max-width: 1250px;
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
.label {
  margin-bottom: 10px;
  min-width: 70px;
  margin-right: 20px;
  margin-top: 8px;
}
// TODO: remove text
.text {
  margin-top: 5px;
  margin-right: 20px;
  min-width: 90px;
}
.v-text-field {
  background-color: white;
  margin-bottom: 20px !important;
}
.label-header {
  margin-bottom: 20px;
  font-weight: 600;
}
.label-sm {
  margin-bottom: 10px;
}
.label-md {
  display: none;
}
.errors {
  justify-self: center;
  color: var(--v-error);
  margin-top: 40px;
}
.action-section {
  margin-top: 40px;
  display: flex;
}
.create-team {
  display: grid;
  min-height: 455px;

  .team-name {
    display: contents;
    margin-bottom: 40px;
  }

  .color-preview {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 45px 110px;
    gap: 5px;
    margin-bottom: 20px;
    min-width: 351px;
    max-width: 351px;
    order: 2;

    #preview-navbar {
      grid-column: span 2;
      background-color: var(--v-secondary);
    }
    #preview-content {
      background-color: var(--v-primary);
    }
    #preview-sidebar {
      background-color: var(--v-tertiary);
    }
    div {
      border-radius: 4px;
    }
  }

  .color-wrapper {
    max-width: 351px;
    display: flex;
    order: 1;
  }
  .recommended-colors-wrapper {
    margin-top: 20px;

    .recommended-color {
      margin-top: 10px;
      margin-right: 20px;
    }
    .color-circle {
      min-width: 15px;
      max-width: 15px;
      min-height: 15px;
      max-height: 15px;
      border-radius: 50%;
      margin: 3px;
    }
  }
}

.invite-team {
  display: flex;
  flex-direction: column;
  min-height: 455px;

  #invite-team-error-section {
    align-self: center;
  }
}
.start-project-text {
  min-width: 90px;
}

.yaaaay-wrapper {
  position: relative;
  min-height: 400px;
  margin-top: 40px;
}
.yaaaay {
  position: absolute;
}
.text-details {
  position: absolute;
  top: 10%;
  left: 50%;

  .heading {
    font-size: 46px;
    font-weight: bold;
    color: var(--v-primary) !important;
  }
  .details {
    font-size: 16px;
  }
}

@media screen and (min-width: 850px) {
  .create-team {
    .team-name {
      display: flex;
    }
    .colors {
      display: flex;
      justify-content: space-between;
    }
    .recommended-colors-wrapper {
      display: flex;

      .recommended-color {
        margin-top: 0;
      }
    }
  }

  .label-sm {
    display: none;
  }
  .label-md {
    display: flex;
  }
}
</style>
