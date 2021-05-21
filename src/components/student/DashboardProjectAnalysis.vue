<template>
  <div class="analysis">
    <v-row>
      <v-col cols="8">
        <div class="analysis-wrapper">
          <div class="analysis-heading">
            <div class="title">Project Analysis</div>
            <div class="analysis-button-wrapper">
              <v-select
                v-model="daysSelected"
                class="analysis-button-small"
                :items="days"
                placeholder="Days"
                hide-details
                outlined
                dense
              >
              </v-select>
            </div>
          </div>
          <div class="analysis-content">
            <div>
              <column-chart
                height="200px"
                :colors="['#34C387']"
                :data="[
                  ['1', 32],
                  ['2', 46],
                  ['3', 28],
                  ['4', 32],
                  ['5', 46],
                  ['6', 28],
                  ['7', 32],
                  ['8', 46],
                  ['9', 28],
                  ['10', 32],
                  ['11', 46],
                  ['12', 28],
                ]"
              ></column-chart>
            </div>
          </div>
        </div>
        <div class="analysis-wrapper">
          <div class="analysis-heading">
            <div class="title">Team Analysis</div>
            <div class="analysis-button-wrapper">
              <v-select
                v-model="listSelected"
                class="analysis-button-medium"
                :items="list"
                placeholder="List"
                hide-details
                outlined
                dense
              >
              </v-select>
              <v-select
                v-model="statusSelected"
                class="analysis-button-small"
                :items="status"
                placeholder="List"
                hide-details
                outlined
                dense
              >
              </v-select>
            </div>
          </div>

          <div class="analysis-content">
            <simplebar style="max-width: 100%">
              <div class="d-flex mb-3">
                <DashboardTeamAnalysisUserCard />
                <DashboardTeamAnalysisUserCard />
                <DashboardTeamAnalysisUserCard />
                <DashboardTeamAnalysisUserCard />
                <DashboardTeamAnalysisUserCard />
              </div>
            </simplebar>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="analysis-wrapper recommended-guides">
          <div class="analysis-heading d-flex">
            <div class="title">Recommended Guides</div>
            <v-btn icon><v-icon>mdi-arrow-right</v-icon></v-btn>
          </div>
          <div class="analysis-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi amet
            qui expedita distinctio hic porro quos vitae totam quibusdam,
            debitis aspernatur veritatis voluptas quam fugiat. Illum eligendi
            nisi quo totam.
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import DashboardTeamAnalysisUserCard from "@/components/student/DashboardTeamAnalysisUserCard.vue";

export default {
  name: "Analysis",
  components: { simplebar, DashboardTeamAnalysisUserCard },
  data: function () {
    return {
      days: ["7 days", "14 days", "30 days"],
      daysSelected: "7 days",
      list: ["Development", "Diagrams", "List 3"],
      listSelected: "Development",
      status: ["Planning", "In Progress", "Review"],
      statusSelected: "Planning",
    };
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.analysis-wrapper {
  background-color: var(--v-lightgrey2);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 25px;
  border-style: solid;
}
.analysis-heading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.title {
  margin-top: 4px;
}
.analysis-button-wrapper {
  display: flex;
}
.analysis-button-small {
  width: 125px;
  margin-left: 10px;
  font-size: 0.8rem;
}
.analysis-button-medium {
  width: 180px;
  margin-left: 10px;
  font-size: 0.8rem;
}
.recommended-guides {
  height: 96.5%;
}
</style>
