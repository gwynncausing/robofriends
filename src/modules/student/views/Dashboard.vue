<template>
  <div id="dashboard">
    <DashboardProjectAnalysis v-if="this.$route.name == 'Dashboard'" />
    <router-view v-else />
  </div>
</template>

<script>
import DashboardProjectAnalysis from "@/components/student/DashboardProjectAnalysis.vue";

export default {
  name: "Dashboard",
  components: {
    DashboardProjectAnalysis,
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
