<template>
  <div id="reset-password">
    <router-link :to="{ name: 'SignIn' }">
      <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain> </v-img>
    </router-link>

    <h5 class="neutral-700--text">
      Your password has been reset successfully!
    </h5>

    <div class="text-center">
      <Button text block @click="signIn">Sign In</Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";

export default {
  name: "ForgotPasswordResetPassword",
  components: {
    Button,
  },
  data() {
    return {};
  },
  methods: {
    signIn() {
      this.$router.replace({ name: "SignIn" });
    },
  },
};
</script>

<style lang="scss" scoped>
#reset-password {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;
}
</style>
