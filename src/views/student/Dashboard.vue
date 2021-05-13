<template>
  <div id="dashboard">
    <div id="dashboard-first-login">
      <DashboardFirstLoginStepper />
    </div>
    <!-- remove the hidden for the main Dashboard -->
    <DashboardProjectAnalysis hidden />
  </div>
</template>

<script>
import DashboardFirstLoginStepper from "@/components/student/DashboardFirstLoginStepper.vue";
import DashboardProjectAnalysis from "@/components/student/DashboardProjectAnalysis.vue";

export default {
  name: "Dashboard",
  components: { DashboardFirstLoginStepper, DashboardProjectAnalysis },
};
</script>

<style>
#dashboard {
  /* background-color: var(--v-lightgrey2);
  border-radius: 4px;
  padding: 10px; */
  /* display: flex; */
  /* justify-content: center; */
}
#dashboard-first-login {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
</style>
