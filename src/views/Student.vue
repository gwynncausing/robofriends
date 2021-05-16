<template>
  <div class="student">
    <AppBar />
    <v-container>
      <v-btn-toggle v-model="toggle" shaped mandatory>
        <v-btn
          @click="
            $route.path === '/student' ? '' : $router.push({ path: '/student' })
          "
        >
          First Logged in Without Invitation
        </v-btn>

        <v-btn @click="$router.push({ path: '/student/invite' })">
          Invited
        </v-btn>

        <v-btn
          @click="
            $route.path === '/student' ? '' : $router.push({ path: '/student' })
          "
        >
          Has Project
        </v-btn>
      </v-btn-toggle>
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
  name: "Student",
  components: { AppBar, Breadcrumbs },
  mixins: [BreadcrumbsMixin],
  data: function () {
    return {
      toggle: 0,
    };
  },
};
</script>
