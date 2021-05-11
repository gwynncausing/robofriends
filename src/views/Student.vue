<template>
  <div class="student">
    <AppBar />
    <v-container>
      <Breadcrumbs :items="route" />
      <router-view />
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
