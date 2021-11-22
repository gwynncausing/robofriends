<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Delete account</h4>
    </template>
    <template v-slot:content>
      <div class="pt-3">
        <span class="subheading-1 neutral-500--text">
          Are you sure that you want to delete your account?
        </span>
      </div>
    </template>
    <template v-slot:footer>
      <v-spacer></v-spacer>
      <Button text class="error--text" @click="deleteAccount"
        >Delete Account</Button
      >
      <Button :loading="isLoading" @click="closeModal()">Keep Account</Button>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ModalDeleteAccount",
  components: {
    Modal,
    Button,
  },
  props: {
    dialogProps: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      teamCode: "",
      dialog: false,
    };
  },
  watch: {
    dialogProps(newVal) {
      this.dialog = newVal;
    },
    dialog(newVal) {
      this.$emit("dialogClose", newVal);
    },
  },
  methods: {
    closeModal() {
      this.dialog = false;
    },
    deleteAccount() {
      // this.dialog = false;
      this.$emit("dialogDeleteAccount");
    },
  },
};
</script>

<style></style>
