<template>
  <div id="email-verification">
    <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain> </v-img>

    <h5>Verify Your Email</h5>

    <div>
      Please verify your email address to complete creating your account. <br />
      <br />
      An email has been sent to <strong>{{ email }} </strong>with a link for
      verification. <br /><br />
      If you have not received the email after a few minutes, please check your
      spam folder. Otherwise, you may request to resend the email.
    </div>

    <Button class="submit-button" @click="resendEmail()"> Resend Email</Button>
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
  max-width: 421px;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;
  h5 {
    color: $tertiary;
  }
  h5 {
    align-self: start;
  }
  .submit-button {
    align-self: end;
  }
}
</style>
