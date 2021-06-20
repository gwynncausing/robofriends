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
          <v-item-group v-if="hasHandledProject" mandatory>
            <v-item
              v-for="(project, index) in projects"
              v-slot="{ active, toggle }"
              :key="project.id"
            >
              <v-card
                :class="[
                  active ? 'selected-project' : '',
                  statusColor(project.status) + '-border',
                ]"
                @click="onToggle(toggle, index)"
              >
                <span class="font-weight-bold">{{ project.teamName }}</span
                ><br />
                <span>{{ project.title }}</span
                ><br />
                <span>{{ project.updatedAt }}</span>
              </v-card>
            </v-item>
          </v-item-group>
        </div>
      </v-col>
      <v-col cols="8">
        <div class="home-wrapper">
          <ProjectDetails
            v-if="!isLoading && hasHandledProject"
            :project-prop="projects[selectedProject]"
            readonly
          />
        </div>
        <div v-if="!isLoading && hasHandledProject" class="home-wrapper">
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
                @click="addFeedback(projectStatus.PROJECT_FINISHED)"
              >
                Finish
              </v-btn>
              <v-btn
                class="btn-change-status"
                depressed
                color="primary"
                @click="addFeedback(projectStatus.PROJECT_ONGOING)"
              >
                Approve
              </v-btn>
              <v-btn
                class="btn-change-status"
                depressed
                color="secondary"
                @click="addFeedback(projectStatus.PROJECT_FOR_REVISION)"
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
// TODO:DONE Create query for all advised team projects
// TODO:DONE parse status
// TODO:DONE parse updatedAt
// TODO:DONE fix bug where projects are not reflected
// TODO:DONE Duplicate keys warning (please see the console for this page)
// TODO:DONE Create mutation UpdateAdvisedProject for project status and feedback

import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import ProjectDetails from "@/components/ProjectDetails.vue";
import DateTimeParser from "@/utils/date-time-parser.js";
import {
  parseProjectStatus,
  PROJECT_ONGOING,
  PROJECT_FOR_REVISION,
  PROJECT_FINISHED,
} from "@/utils/utils.js";
import { mapGetters } from "vuex";
import GET_ADVISED_PROJECTS from "@/modules/adviser/graphql/queries/get-advised-projects.gql";
import UPDATE_ADVISED_PROJECT from "@/modules/adviser/graphql/mutations/update-advised-project.gql";

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
      isLoading: true,
      selectedProject: 0,
      selectedFeedback: 0,
      selectedFeedbackText: "",
      chosenProject: null,
      previousProjectsLength: 0,
      newAdvisedProjectsLength: 0,
      hasHandledProject: false,
      projectStatus: {
        PROJECT_ONGOING: PROJECT_ONGOING,
        PROJECT_FOR_REVISION: PROJECT_FOR_REVISION,
        PROJECT_FINISHED: PROJECT_FINISHED,
      },
      projects: [
        //sample data format
        // {
        //   id: "cary1",
        //   title: "Cary title",
        //   description: "Cary descr",
        //   teamName: "Cary & Co.",
        //   status: "Ongoing",
        //   objectives: [
        //     {
        //       text: "Cary obj",
        //       status: "For Revision",
        //     },
        //   ],
        //   categories: ["Cary lang sakalam"],
        //   feedbacks: [
        //     {
        //       id: "cary2",
        //       date: "1/1/2021",
        //       time: "11:00",
        //       text: "Cary",
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
  watch: {
    advisedProjectsFromServer(newAdvisedProjects, previousAdvisedProjects) {
      this.isLoading = false;
      if (previousAdvisedProjects == null)
        this.previousProjectsLength = newAdvisedProjects.edges.length;
      else this.previousProjectsLength = previousAdvisedProjects.edges.length;
      this.newAdvisedProjectsLength = newAdvisedProjects.edges.length;
      this.initialize();
    },
  },
  methods: {
    initialize() {
      if (this.advisedProjectsFromServer.edges.length > 0) {
        this.projects = [];
        this.hasHandledProject = true;
        const advisedProjects = this.advisedProjectsFromServer.edges.sort(
          (a, b) => new Date(b.node.updatedAt) - new Date(a.node.updatedAt)
        );
        advisedProjects.forEach((edge) => {
          console.log(edge);
          let tempProject = {
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            teamName: edge.node.teamName,
            status: parseProjectStatus(edge.node.status),
            updatedAt: DateTimeParser.parse(
              edge.node.updatedAt,
              "MM/DD/YYYY hh:mm a"
            ),
            objectives: this.addObjectivesToProject(edge.node.objectives),
            categories: this.addCategoriesToProject(edge.node.categories),
            feedbacks: this.addFeedbackToProject(edge.node.feedbacks),
          };
          this.projects.push(tempProject);
        });
        if (this.previousProjectsLength != this.newAdvisedProjectsLength) {
          const index = Math.abs(
            this.newAdvisedProjectsLength - this.previousProjectsLength
          );
          if (this.newAdvisedProjectsLength > this.previousProjectsLength)
            this.selectedProject += index;
          else this.selectedProject -= this.selectedProject == 0 ? 0 : index;
        } else this.selectedProject = 0;
      } else this.hasHandledProject = false;
    },
    addCategoriesToProject(categories) {
      let categoryList = [];
      categories.edges.forEach((edge) => {
        console.log(edge.node.name);
        categoryList.push(edge.node.name);
      });
      return categoryList;
    },
    addObjectivesToProject(objectives) {
      let objectiveList = [];
      objectives.edges.forEach((edge) => {
        objectiveList.push({
          id: edge.node.id,
          text: edge.node.name,
          status: parseProjectStatus(edge.node.status),
        });
      });
      return objectiveList;
    },
    addFeedbackToProject(feedback) {
      let feedbackList = [];
      feedback.edges.forEach((edge) => {
        console.log(edge.node.createdAt);
        feedbackList.push({
          id: edge.node.id,
          text: edge.node.message,
          date: DateTimeParser.parse(edge.node.createdAt, "MM/DD/YYYY"),
          time: DateTimeParser.parse(edge.node.createdAt, "hh:mm a"),
        });
      });
      return feedbackList;
    },
    statusColor(text) {
      if (this.text === null) return "midgrey";
      let i = this.status.findIndex((x) => x.name === text);
      return this.status[i].color;
    },
    async addFeedback(status) {
      const input = {
        projectId: this.projects[this.selectedProject].id,
        status: status,
      };
      if (this.selectedFeedback === 0 && this.selectedFeedbackText !== null)
        if (this.selectedFeedbackText.trim() !== "")
          input["feedback"] = this.selectedFeedbackText;
      await this.$apollo.mutate({
        mutation: UPDATE_ADVISED_PROJECT,
        variables: { input },
      });
      this.selectedFeedback = 0;
      this.setSelectedFeedbackText(null);
    },
    setSelectedFeedbackText(feedback) {
      if (feedback === null) this.selectedFeedbackText = "";
      else this.selectedFeedbackText = feedback.text;
    },
    onToggle(toggle, index) {
      toggle();
      this.selectedProject = index;
      this.selectedFeedback = 0;
      this.setSelectedFeedbackText(null);
    },
  },
  apollo: {
    advisedProjectsFromServer: {
      query: GET_ADVISED_PROJECTS,
      update: (data) => data.projects,
      variables() {
        return {
          advisers: [`${this.getUser.id}`],
        };
      },
      pollInterval: 10000,
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
