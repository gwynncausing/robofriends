<template>
  <div id="dashboard">
    <div id="dashboard-first-login">
      <DashboardFirstLoginStepper class="d-none" />
    </div>
    <!-- remove the hidden for the main Dashboard -->
    <DashboardProjectAnalysis />
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
#dashboard-first-login {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
</style>
