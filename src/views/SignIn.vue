<template>
  <div class="signin">
    <div class="grid-item-content">
      <v-img src="@/assets/logo.svg" alt="Bud Logo" height="130" contain>
        <template v-slot:placeholder>
          <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        </template>
      </v-img>

      <v-form
        ref="form"
        class="signin-form"
        lazy-validation
        @submit.prevent="signin"
      >
        <TextField v-model="user.email" name="email" label="Email"></TextField>
        <TextField
          v-model="user.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="Password"
          @click:append="show1 = !show1"
        >
        </TextField>

        <div v-if="error" class="errors">
          {{ error }}
        </div>
        <div class="py-6">
          <Button block :loading="isSubmit" type="submit"> Sign In </Button>
        </div>
      </v-form>
      <div>
        <div>
          <Button text block :to="{ name: 'CreateAccount' }">
            No Account Yet? Get started here!
          </Button>
        </div>

        <div class="py-6">
          <Button text block :to="{ name: 'CreateAccount' }">
            I cannot access my account
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Signin",
  components: {
    TextField,
    Button,
  },
  data: function () {
    return {
      user: {},
      userForSubmit: {},
      error: "",
      show1: false,
      isSubmit: false,
    };
  },
  computed: {
    ...mapGetters({
      getUserType: "user/getUserType",
    }),
  },
  methods: {
    verifyEmailPassword() {
      return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        this.user.email
      );
    },
    async signin() {
      let isEmailOk = this.verifyEmailPassword();
      if (isEmailOk || !this.user.password) {
        this.error = "Invalid Email or Password";
        return;
      }

      this.error = "";
      this.isSubmit = true;

      // const credentials = { ...this.user };
      // const data = await this.onLogin(credentials);
      // console.log(data)
      // if (data.success) {
      //   this.error = "";
      //   if (this.getUserType == "STUDENT") this.$router.push("/student");
      //   else this.$router.push("/adviser");
      // } else if (data.success == false) {
      //   data.errors.nonFieldErrors[0].message =
      //     "Please enter your valid credentials";
      //   this.isSubmit = false;
      //   this.error = data.errors.nonFieldErrors[0].message;
      // } else {
      //   this.error = "Please check your internet connection";
      this.isSubmit = false;
    },
    ...mapActions({
      onLogin: "user/login",
    }),
  },
};
</script>

<style lang="scss" scoped>
.signin {
  max-width: 414px;
  min-width: 360px;
  padding: 40px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  height: 100%;
  width: 100%;
}

.grid-item-content {
  grid-column: 1 / 5;
  height: fit-content;
}
.forgot-password {
  margin-bottom: 40px;
  text-decoration: none;
}
.errors {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: var(--v-error);
}
.signin-form {
  margin-top: 48px;
}
</style>
