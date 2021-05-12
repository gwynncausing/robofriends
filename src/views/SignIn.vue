<template>
  <div class="signin">
    <v-row>
      <v-col lg="3" md="4" sm="6" cols="8">
        <v-row>
          <ImageLogo height="150px" width="200px" />
        </v-row>
        <v-form ref="form" lazy-validation @submit.prevent="signin">
          <v-row>
            <InputField
              label="Email"
              placeholder="firstname.lastname@cit.edu"
              type="email"
              :required="true"
              @output="
                ($event) => {
                  user.email = $event;
                }
              "
            />
          </v-row>
          <v-row>
            <InputField
              label="Password"
              placeholder="••••••••••••"
              type="password"
              :required="true"
              @output="
                ($event) => {
                  user.password = $event;
                }
              "
            />
          </v-row>
          <v-row class="forgot-password"><span>Forgot Password</span></v-row>
          <!-- Error Tags -->
          <v-row class="mb-5" v-if="error">
            {{ error }}
          </v-row>
          <v-row>
            <v-btn class="btn-signin" type="submit" large depressed block dark>
              Sign in
            </v-btn>
          </v-row>
        </v-form>

        <v-row class="or"> or </v-row>

        <!-- <v-row>
          <v-btn depressed block outlined>
            <v-img :src="require('@/assets/Google.svg')" height="18" contain />
            <span>Sign in with Google</span>
          </v-btn>
        </v-row> -->

        <v-row>
          <v-btn depressed large block outlined>
            <v-icon>mdi-microsoft</v-icon>
            <!-- <v-img
              :src="require('@/assets/Microsoft.svg')"
              height="18"
              contain
            /> -->
            <span>Sign in with Microsoft</span>
          </v-btn>
        </v-row>

        <v-row class="mt-10">
          <a href="/signup">No account yet? Get started here!</a>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ImageLogo from "@/components/ImageLogo.vue";
import InputField from "@/components/InputField.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Signin",
  components: {
    ImageLogo,
    InputField,
  },
  data: function () {
    return {
      user: {},
      error: "",
    };
  },
  computed: {
    ...mapGetters({
      getUserType: "user/getUserType",
    }),
  },
  methods: {
    async signin() {
      console.log("user: ", this.user);
      if (this.$refs.form.validate()) {
        const credentials = { ...this.user };
        const data = await this.onLogin(credentials);
        // console.log(data)
        if (data.success) {
          this.error = "";
          if (this.getUserType == "STUDENT") 
            this.$router.push("/student");
          else 
            this.$router.push("/adviser");
        } 
        else if (data.success == false) {
          data.errors.nonFieldErrors[0].message = "Please enter your valid credentials";
          this.error = data.errors.nonFieldErrors[0].message;
        } 
        else 
          this.error = "Please check your internet connection";
      } 
      else 
        console.log("Validation raised");
    },
    getOutput(e) {
      console.log(e);
    },
    ...mapActions({
      onLogin: "user/login",
    }),
  },
};
</script>

<style lang="scss" scoped>
.row,
.col {
  justify-content: center;
}
.signin {
  margin: 50px 0px;
}

.forgot-password {
  justify-content: left;
  cursor: pointer;
  font-size: 0.8em;
  color: var(--v-primary) !important;
  margin-bottom: 40px;
}
.btn-signin {
  background-color: var(--v-primary) !important;
}
.v-btn {
  margin-bottom: 20px;
}
.or {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
