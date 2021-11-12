<template>
  <v-snackbar
    v-model="snackbar"
    color="white"
    class="mb-3"
    :value="true"
    :timeout="timeout"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="content" />
    <template v-slot:action="{ attrs }">
      <v-btn color="error" text v-bind="attrs" icon @click="closeSnackbar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    isSnackbarShown: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      snackbar: "",
    };
  },
  watch: {
    isSnackbarShown(newValue) {
      this.snackbar = newValue;
    },
    snackbar(newValue) {
      if (!newValue) this.$emit("closeSnackbar");
    },
  },
  methods: {
    closeSnackbar() {
      this.$emit("closeSnackbar");
    },
  },
};
</script>

<style></style>
