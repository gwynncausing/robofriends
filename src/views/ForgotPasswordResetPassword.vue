<template>
  <div id="reset-password">
    <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain> </v-img>

    <h5>Reset Password</h5>

    <div class="description">Choose your new Password</div>
    <div class="input-field">
      <TextField v-model="password1" label="New Password" type="password" />
      <TextField v-model="password2" label="New Password" type="password" />
      <Button class="submit-button" @click="resendEmail()"> Reset</Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import TextField from "@/components/global/TextField.vue";

export default {
  name: "ForgotPasswordResetPassword",
  components: {
    Button,
    TextField,
  },
  data() {
    return {
      password1: "",
      password2: "",
    };
  },

  methods: {
    //
  },
};
</script>

<style lang="scss" scoped>
#reset-password {
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
  .description,
  h5 {
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
