<template>
  <div id="email-verification">
    <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain> </v-img>

    <div v-if="!forVerifyingEmail" id="show-info-verify-email">
      <h5>Verify Your Email</h5>
      <div>
        Please verify your email address to complete creating your account.
        <br />
        <br />
        An email has been sent to <strong>{{ email }} </strong>with a link for
        verification. <br /><br />
        If you have not received the email after a few minutes, please check
        your spam folder. Otherwise, you may request to resend the email.
      </div>

      <Button
        class="submit-button"
        :loading="isResendingEmail"
        :disabled="isResendDisable"
        @click="resendEmail()"
      >
        {{ sendButtonContent }}</Button
      >
    </div>
    <div v-else id="verify-email">
      <div v-if="isVerifyingEmail">
        <h5 class="mb-3 neutral-600--text">Verifying Account</h5>
        <LoaderCircular />
      </div>
      <div v-else id="account-verified" class="d-block">
        <h5 class="mb-1 neutral-600--text">Account Verified</h5>
        <v-icon color="primary" x-large>mdi-check-circle</v-icon><br />
        <div class="mt-5">
          You may now
          <span class="primary--text pointer-cursor" @click="goToSignIn">
            <strong>sign in </strong>
          </span>
          to your account.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";
import LoaderCircular from "@/components/LoaderCircular.vue";

import { mapActions, mapGetters } from "vuex";
import { ROOT_ACTIONS, ROOT_GETTERS } from "@/store/types";

export default {
  name: "EmailVerification",
  components: {
    Button,
    LoaderCircular,
  },
  data() {
    return {
      isResendingEmail: false,
      sendButtonContent: "Resend Link",
      isResendDisable: false,
      isVerifyingEmail: false,
      forVerifyingEmail: false,
    };
  },
  computed: {
    ...mapGetters({
      getUserMeta: ROOT_GETTERS.GET_USER_META,
    }),
    email() {
      return this.getUserMeta.email;
    },
  },
  created() {
    const token = this.$route.query.token ?? null;
    if (token !== null) {
      this.forVerifyingEmail = true;
      this.verifyAccount(token);
    }
  },
  methods: {
    ...mapActions({
      onResendVerificationLink: ROOT_ACTIONS.RESEND_VERIFICATION_LINK,
      onVerifyAccount: ROOT_ACTIONS.VERIFY_ACCOUNT,
    }),
    async verifyAccount(token) {
      try {
        this.isVerifyingEmail = true;
        const payload = { token: token };
        await this.onVerifyAccount(payload);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          this.isVerifyingEmail = false;
        }, 1000);
      }
    },
    async resendEmail() {
      try {
        this.isResendingEmail = true;
        const payload = { email: this.getUser.email };
        await this.onResendVerificationLink(payload);
        this.sendButtonContent = "Resend Successfully";
      } catch (error) {
        // TODO: Handle if token is expired/invalid
        console.log(error);
      } finally {
        this.isResendingEmail = false;
        this.isResendDisable = true;
      }
    },
    goToSignIn() {
      this.$router.push({ name: "SignIn" });
    },
  },
};
</script>

<style lang="scss" scoped>
#email-verification {
  margin-top: 40px;
  #show-info-verify-email {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
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
  #verify-email {
    margin-top: 40px;
    text-align: center;
  }
  #account-verified {
    animation: fade-in-opacity 0.5s ease-in;
  }
  .pointer-cursor {
    cursor: pointer;
  }
}
@keyframes fade-in-opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
