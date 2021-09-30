<template>
  <v-dialog v-model="dialogModal" width="500">
    <v-card class="pa-5">
      <v-card-title class="text-h5">
        <slot name="title"></slot>
      </v-card-title>

      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>

      <v-card-actions>
        <slot name="footer"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalSmall",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogModal: false,
    };
  },
  watch: {
    dialog(newVal) {
      this.dialogModal = newVal;
    },
    dialogModal(newVal) {
      if (!newVal) this.closeModal();
    },
  },
  methods: {
    closeModal() {
      this.$emit("closed", false);
    },
  },
};
</script>

<style></style>
