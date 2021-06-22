<template>
  <div class="signin">
    <div class="grid-item-content">
      <ImageLogo height="150px" width="200px" />
      <div class="signin-form">
        <v-form ref="form" lazy-validation @submit.prevent="signin">
          <TextField
            v-model="user.email"
            name="email"
            label="Email"
          ></TextField>
          <TextField
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="password"
            label="Password"
            @click:append="show1 = !show1"
          >
          </TextField>
          <router-link class="forgot-password" :to="{ path: '/' }">
            Forgot Password?
          </router-link>

          <div class="errors">
            {{ error }}
          </div>
          <Button block :loading="isSubmit" type="submit"> Sign In </Button>
        </v-form>
        <Button color="darkgrey" block outlined class="signin-microsoft">
          <v-avatar right>
            <v-img
              src="https://docs.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-azure-ad-apps/ms-symbollockup_mssymbol_19.svg"
              alt="Microsoft"
              contain
              height="25"
            />
          </v-avatar>
          Sign in with Microsoft
        </Button>
        <Button text block class="no-account" :to="{ path: 'signup' }">
          No Account Yet? Get started here!
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import ImageLogo from "@/components/ImageLogo.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Signin",
  components: {
    ImageLogo,
    TextField,
    Button,
  },
  data: function () {
    return {
      user: {},
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
    async signin() {
      this.isSubmit = true;
      if (this.$refs.form.validate()) {
        const credentials = { ...this.user };
        const data = await this.onLogin(credentials);
        // console.log(data)
        if (data.success) {
          this.error = "";
          if (this.getUserType == "STUDENT") this.$router.push("/student");
          else this.$router.push("/adviser");
        } else if (data.success == false) {
          data.errors.nonFieldErrors[0].message =
            "Please enter your valid credentials";
          this.isSubmit = false;
          this.error = data.errors.nonFieldErrors[0].message;
        } else {
          this.error = "Please check your internet connection";
          this.isSubmit = false;
        }
      } else {
        console.log("Validation raised");
        this.isSubmit = false;
      }
    },
    ...mapActions({
      onLogin: "user/login",
    }),
  },
};
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
}

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
.v-text-field {
  background-color: white;
  margin-bottom: 20px !important;
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
.v-btn {
  height: 40px !important;
  margin-bottom: 40px;

  &.no-account,
  &.signin-microsoft {
    letter-spacing: 0.5px;
  }

  &.signin-microsoft {
    background-color: white;
    margin-bottom: 70px;
  }
}
</style>
