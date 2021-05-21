<template>
  <div class="adviser">
    <AppBar />
    <v-container>
      <Breadcrumbs v-if="toggle === 2" class="mt-1" :items="route" />
      <router-view class="mt-5" :toggle="toggle" />
    </v-container>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import BreadcrumbsMixin from "@/mixins/BreadcrumbsMixin";

export default {
  name: "Adviser",
  components: { AppBar, Breadcrumbs },
  mixins: [BreadcrumbsMixin],
  data: function () {
    return {
      toggle: 2,
    };
  },
};
</script>
