<template>
  <div class="home">
    <v-row>
      <v-col cols="4">
        <div class="home-wrapper">
          <div class="home-heading">
            <div class="title">Advised Teams</div>
          </div>
          <v-list-group class="mb-6" @change="selectedFeedback = 0">
            <template v-slot:activator>
              <v-list-item-title>Legend:</v-list-item-title>
            </template>
            <v-list class="px-4" color="lightgrey2">
              <v-row>
                <v-col>
                  <span class="dot midgrey mr-2"></span>
                  <span> Not Started</span>
                </v-col>
                <v-col>
                  <span class="dot blue mr-2"></span>
                  <span> Pending</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="dot yellow mr-2"></span>
                  <span> Ongoing</span>
                </v-col>
                <v-col>
                  <span class="dot red mr-2"></span>
                  <span> For Revision</span>
                </v-col>
              </v-row>
            </v-list>
          </v-list-group>
          <v-item-group v-model="selectedProject" mandatory>
            <v-item
              v-for="project in projects"
              v-slot="{ active, toggle }"
              :key="project.id"
            >
              <v-card
                :class="[
                  active ? 'selected-project' : '',
                  statusColor(project.status) + '-border',
                ]"
                @click="toggle"
              >
                <span>{{ project.teamName }}</span
                ><br />
                <span>{{ project.title }}</span>
              </v-card>
            </v-item>
          </v-item-group>
        </div>
      </v-col>
      <v-col cols="8">
        <div class="home-wrapper">
          <ProjectDetails :project-prop="projects[selectedProject]" readonly />
        </div>
        <div class="home-wrapper">
          <div class="home-heading">
            <div class="title">Feedbacks</div>
          </div>
          <v-row>
            <v-col cols="4">
              <simplebar style="max-height: 200px">
                <v-list-item-group v-model="selectedFeedback">
                  <v-list-item @click="setSelectedFeedbackText({})">
                    Current
                  </v-list-item>
                  <v-list-item
                    v-for="feedback in projects[selectedProject].feedbacks
                      .slice()
                      .reverse()"
                    :key="feedback.id"
                    @click="setSelectedFeedbackText(feedback)"
                  >
                    {{ feedback.date }} {{ feedback.time }}
                  </v-list-item>
                </v-list-item-group>
              </simplebar>
            </v-col>
            <v-col cols="8">
              <v-textarea
                v-model="selectedFeedbackText"
                outlined
                no-resize
                rows="6"
                :readonly="selectedFeedback !== 0"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-btn text>Guidelines</v-btn>
            </v-col>
            <v-col cols="8">
              <v-btn
                class="btn-change-status"
                depressed
                color="lightgrey"
                @click="addFeedback('Finished')"
              >
                Finish
              </v-btn>
              <v-btn
                class="btn-change-status"
                depressed
                color="primary"
                @click="addFeedback('Ongoing')"
              >
                Approve
              </v-btn>
              <v-btn
                class="btn-change-status"
                depressed
                color="secondary"
                @click="addFeedback('For Revision')"
              >
                Revise
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// TODO: Create query for all advised team projects
// TODO: Create mutation UpdateAdvisedProject for project status and feedback
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import ProjectDetails from "@/components/ProjectDetails.vue";
export default {
  name: "Home",
  components: { simplebar, ProjectDetails },
  data() {
    return {
      status: [
        {
          name: "Not Started",
          color: "midgrey",
        },
        {
          name: "Pending",
          color: "blue",
        },
        {
          name: "Ongoing",
          color: "yellow",
        },
        {
          name: "For Revision",
          color: "red",
        },
        {
          name: "Finished",
          color: "green",
        },
      ],
      selectedProject: 0,
      selectedFeedback: 0,
      selectedFeedbackText: "",
      projects: [
        // sample data format
        {
          id: "cary1",
          title: "Cary title",
          description: "Cary descr",
          teamName: "Cary & Co.",
          status: "Ongoing",
          objectives: [
            {
              text: "Cary obj",
              status: "For Revision",
            },
          ],
          categories: ["Cary lang sakalam"],
          feedbacks: [
            {
              id: "cary2",
              date: "1/1/2021",
              time: "11:00",
              text: "Cary",
            },
          ],
        },
      ],
    };
  },
  methods: {
    statusColor(text) {
      if (this.text === null) return "midgrey";
      let i = this.status.findIndex((x) => x.name === text);
      return this.status[i].color;
    },
    addFeedback(status) {
      console.log(this.selectedFeedbackText);
      // add feedback query
      // set status according to button clicked
      console.log(status);
      // dont remove this
      this.selectedFeedback = 0;
      this.setSelectedFeedbackText({});
    },
    setSelectedFeedbackText(feedback) {
      if (feedback === null) this.selectedFeedbackText = "";
      else this.selectedFeedbackText = feedback.text;
    },
  },
};
</script>

<style lang="scss" scoped>
.home-wrapper {
  background-color: var(--v-lightgrey2);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 25px;
}
.home-heading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.title {
  margin-top: 4px;
}
.text {
  margin-top: 8px;
  margin-right: 10px;
  min-width: 40px;
}
.v-btn-toggle {
  flex-direction: column;
}
.v-card {
  padding: 10px;
  margin-bottom: 20px;
  &.selected-project {
    outline: solid 3px var(--v-primary);
  }
  &.midgrey-border {
    border-bottom: 4px solid var(--v-midgrey);
  }
  &.yellow-border {
    border-bottom: 4px solid var(--v-yellow);
  }
  &.blue-border {
    border-bottom: 4px solid var(--v-blue);
  }
  &.red-border {
    border-bottom: 4px solid var(--v-red);
  }
}
.dot {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
}
.btn-change-status {
  width: 32%;
  margin-right: 1.2%;
}
</style>
