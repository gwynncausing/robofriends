<template>
  <v-responsive class="first-login-stepper">
    <v-stepper v-model="e1" alt-labels class="elevation-0">
      <v-stepper-header>
        <v-stepper-step step="1"> Create Team </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2"> Invite Team </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Start Project </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="mb-12">
            <div class="d-flex">
              <span class="text">Team Name</span>
              <InputField
                placeholder="Team Name"
                @output="
                  ($event) => {
                    proejct.teamname = $event;
                  }
                "
              />
            </div>
            <div
              v-for="(item, i) in project.color"
              :key="i"
              class="color-wrapper d-flex"
            >
              <span class="text">Primary</span>
              <Button class="mr-4" :color="item.hex" />
              <InputField class="mr-4" :text="item.rgb" />
              <InputField :text="item.hex" />
            </div>
            <div class="recommended-colors-wrapper">
              <span class="text">Recommended Colors:</span>
              <Button color="red" class="mr-4" />
              <Button color="blue" class="mr-4" />
              <Button color="yellow" class="mr-4" />
            </div>
          </div>

          <div class="d-flex">
            <Button color="primary" class="ml-auto" @click="e1 = 2">
              Continue
            </Button>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="mb-12">
            <div class="d-flex">
              <span class="text">Adviser</span>
              <InputField
                placeholder="Adviser"
                @output="
                  ($event) => {
                    proejct.adviser = $event;
                  }
                "
              />
            </div>

            <div v-for="(member, n) in project.members" :key="n" class="d-flex">
              <span class="text">Member {{ n + 1 }}:</span>
              <InputField
                class="mr-4"
                placeholder="lastname.firstname@cit.edu"
                @output="
                  ($event) => {
                    member.name = $event;
                  }
                "
              />
              <div style="width: 200px"><InputField placeholder="Roles" /></div>
            </div>
          </div>

          <div class="d-flex">
            <Button text @click="e1 = 1"> Back </Button>

            <Button color="primary" class="ml-auto" @click="e1 = 3">
              Invite
            </Button>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="mb-12">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
            assumenda ipsum quia velit blanditiis modi autem veritatis facilis
            hic ut molestiae totam nihil inventore ipsa libero accusamus quos
            amet deleniti.
          </div>

          <div class="d-flex">
            <!-- <Button text @click="e1 = 1"> Back </Button> -->

            <Button color="primary" class="ml-auto" @click="start">
              Start
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

export default {
  name: "DashboardFirstLoginStepper",
  components: { InputField, Button },
  data() {
    return {
      e1: 1,
      steps: 3,
      project: {
        color: {
          primary: {
            rgb: "rgb(52, 195, 135)",
            hex: "#34C387",
          },
          secondary: {
            rgb: "rgb(241, 111, 130)",
            hex: "#F16F82",
          },
          tertiary: {
            rgb: "rgb(0, 106, 62)",
            hex: "#006A3E",
          },
        },
        members: [
          {
            name: "",
            roles: [],
          },
          {
            name: "",
            roles: [],
          },
          {
            name: "",
            roles: [],
          },
        ],
      },
    };
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },

  methods: {
    nextStep(n) {
      console.log("next step", n, this.steps);
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    start() {
      console.log("Start");
    },
  },
};
</script>

<style lang="scss" scoped>
.first-login-stepper {
  // background-color: var(--v-lightgrey2);
  background-color: white;
  border-radius: 4px;
  padding: 10px;
}
.v-stepper__header {
  box-shadow: none;
  background-color: var(--v-lightgrey2);
  border-radius: 4px;
  padding: 10px;
}
.v-stepper__items {
  background-color: var(--v-lightgrey2);
  border-radius: 4px;
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
.color-wrapper {
  max-width: 500px;
}
</style>
