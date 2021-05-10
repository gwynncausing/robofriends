<template>
  <div class="login">
    <v-row class="text-center mt-10">
      <v-img
        :src="require('../assets/logo.svg')"
        class="my-3"
        contain
        height="100"
      />
    </v-row>

    <v-row class="center-row">
      <v-col cols="10" lg="3" md="4" sm="5">
        <v-text-field label="Email" type="email" hide-details> </v-text-field>
      </v-col>
    </v-row>

    <v-row class="center-row mt-0">
      <v-col cols="10" lg="3" md="4" sm="5" class="p-0 m-0">
        <v-text-field label="Password" type="password" hide-details>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center mt-0">
      <v-col cols="10" lg="3" md="4" sm="5">
        <span>Forgot Password?</span>
      </v-col>
    </v-row>

    <v-row class="center-row mt-11">
      <v-col cols="10" lg="3" md="4" sm="5">
        <v-btn
          :color="this.$vuetify.theme.themes.light.primary"
          depressed
          dark
          block
        >
          Sign in
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="center-row mt-10">or</v-row>
    <v-row class="center-row mt-10">
      <v-col cols="10" lg="3" md="4" sm="5">
        <v-btn depressed block outlined>
          <v-spacer></v-spacer>
          <v-img
            :src="require('../assets/Google.svg')"
            class="my-3"
            height="18"
            contain
          />
          <span>Sign in with Google</span>
          <v-spacer></v-spacer>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="center-row mt-0">
      <v-col cols="10" lg="3" md="4" sm="5">
        <v-btn depressed block outlined>
          <v-spacer></v-spacer>
          <v-img
            :src="require('../assets/Microsoft.svg')"
            class="my-3"
            height="18"
            contain
          />
          <span>Sign in with Microsoft</span>
          <v-spacer></v-spacer>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="center-row mt-16">
      <!-- <p :style="cssProps"> -->
      <p>No account yet? Get started<strong> here!</strong></p>
    </v-row>

    <v-row class="center-row mt-16">
      <label>DARK MODE</label>
      <v-switch v-model="$vuetify.theme.dark" />
      <v-color-picker
        v-model="$vuetify.theme.themes.light.primary"
      ></v-color-picker>

      <!-- <v-btn @click="setTheme"> set </v-btn> -->
      <!-- {{ this.primary }}
      {{ this.$vuetify.theme.themes.light.primary }} -->
    </v-row>

    <v-row class="center-row mt-16">
      <span>Version 2.0</span>
      <v-spacer></v-spacer>
      <span>
        <v-icon dense>mdi-help-circle-outline</v-icon>
        Help
      </span>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    text: "",
    primary: "",
  }),
  watch: {
    primary: "setTheme",
  },
  methods: {
    setTheme() {
      this.$vuetify.theme.themes.light.primary = this.primary;
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  color: var(--v-primary);
}
.center-row {
  display: flex;
  justify-content: center;
  margin-top: 16px !important;
}
</style>
