<template>
  <v-dialog v-model="dialogModal" :width="width">
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
    small: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      width: 500,
      dialogModal: false,
    };
  },
  watch: {
    small() {
      this.setModalSize();
    },
    medium() {
      this.setModalSize();
    },
    large() {
      this.setModalSize();
    },
    dialog(newVal) {
      this.dialogModal = newVal;
    },
    dialogModal(newVal) {
      if (!newVal) this.closeModal();
    },
  },
  mounted() {
    this.setModalSize();
  },
  methods: {
    setModalSize() {
      if (this.small) this.width = 500;
      if (this.medium) this.width = 700;
      if (this.large) this.width = 950;
    },
    closeModal() {
      this.$emit("closed", false);
    },
  },
};
</script>

<style></style>
