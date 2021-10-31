<template>
  <div id="forgot-password">
    <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain> </v-img>

    <h5>Verify Your Email</h5>

    <div>
      Please enter your email to search for your account and we’ll send you the
      steps to reset your password.
    </div>
    <div class="input-field">
      <TextField v-model="email" label="Email" />
      <Button class="submit-button" @click="resendEmail()"> Send</Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import TextField from "@/components/global/TextField.vue";

export default {
  name: "EmailVerification",
  components: {
    Button,
    TextField,
  },
  data() {
    return {
      email: "",
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
#forgot-password {
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
    align-self: start;
  }
  .input-field {
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
  }
  .submit-button {
    width: fit-content;
    align-self: end;
  }
}
</style>
