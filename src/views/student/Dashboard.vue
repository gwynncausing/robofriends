<template>
  <div id="dashboard">
    <div v-if="toggle === 0" id="dashboard-first-login">
      <DashboardCreateTeamStepper />
    </div>
    <!-- remove the d-none for the main Dashboard -->
    <DashboardProjectAnalysis v-else />
  </div>
</template>

<script>
import DashboardCreateTeamStepper from "@/components/student/DashboardCreateTeamStepper.vue";
import DashboardProjectAnalysis from "@/components/student/DashboardProjectAnalysis.vue";

export default {
  name: "Dashboard",
  components: { DashboardCreateTeamStepper, DashboardProjectAnalysis },
  props: {
    toggle: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
#dashboard-first-login {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
</style>
