<template>
  <div class="adviser">
    <AppBar />
    <v-container>
      <router-view class="mt-5" />
    </v-container>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

export default {
  name: "Adviser",
  components: { AppBar },
  data: function () {
    return {
      //
    };
  },
};
</script>
