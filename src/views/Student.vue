<template>
  <div class="student">
    <Breadcrumbs :items="route" />
    <v-container>
      <router-view />
    </v-container>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import BreadcrumbsMixin from "@/mixins/BreadcrumbsMixin";

export default {
  name: "Student",
  components: { Breadcrumbs },
  mixins: [BreadcrumbsMixin],
};
</script>
