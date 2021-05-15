<template>
  <div class="student">
    <AppBar />
    <v-container>
      <Breadcrumbs class="mt-1" :items="route" />
      // Comment: This breadcrumb will only show if the user has a team
      <router-view class="mt-5" />
    </v-container>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import BreadcrumbsMixin from "@/mixins/BreadcrumbsMixin";

export default {
  name: "Student",
  components: { AppBar, Breadcrumbs },
  mixins: [BreadcrumbsMixin],
};
</script>
