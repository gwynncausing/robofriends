<template>
  <div id="email-verification">
    <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain> </v-img>

    <h5 class="title-signup mb-8">Verify Your Email</h5>

    <div>You will need to verify to complete your registration.</div>

    <div>
      An email has been sent to {{ email }} with a link to verify your account.
      If you have not received the email after a few minutes, please check your
      spam folder.
    </div>

    <Button @click="resendEmail()"> Resend Email</Button>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";

export default {
  name: "EmailVerification",
  components: {
    Button,
  },
  data() {
    return {
      email: "cary.legaspi@cit.edu",
    };
  },
  methods: {
    resendEmail() {
      console.log("resendEmail called");
    },
  },
};
</script>

<style lang="scss" scoped>
#email-verification {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 729px;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;
  h5 {
    color: $tertiary;
  }
}
</style>
