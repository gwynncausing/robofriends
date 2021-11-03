<template>
  <div id="forgot-password">
    <router-link :to="{ name: 'SignIn' }">
      <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain> </v-img>
    </router-link>

    <h5>Verify Your Email</h5>

    <div>
      Please enter your email to search for your account and we’ll send you the
      steps to reset your password.
    </div>

    <v-form
      ref="form"
      class="input-field"
      lazy-validation
      @submit.prevent="resendEmail"
    >
      <TextField v-model="email" label="Email" required :rules="rules.email" />
      <Button
        class="submit-button"
        :loading="isSendingEmail"
        @click="resendEmail"
      >
        Send</Button
      >
    </v-form>

    <div v-if="message !== ''" class="primary--text">
      {{ message }}
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import TextField from "@/components/global/TextField.vue";
import { mapActions } from "vuex";
import { ROOT_ACTIONS } from "@/store/types";

export default {
  name: "ForgotPassword",
  components: {
    Button,
    TextField,
  },
  data() {
    return {
      email: "",
      isSendingEmail: false,
      message: "",
      rules: {
        email: [
          (v) => !!v || "Email is required",
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Invalid Email",
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      onSendPasswordResetLink: ROOT_ACTIONS.SEND_PASSWORD_RESET_LINK,
    }),
    async resendEmail() {
      if (!this.$refs.form.validate()) return;
      try {
        this.isSendingEmail = true;
        const payload = { email: this.email };
        await this.onSendPasswordResetLink(payload);
        this.message = "You may now check your email";
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      } catch (error) {
        console.log(error);
      } finally {
        this.isSendingEmail = false;
      }
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
