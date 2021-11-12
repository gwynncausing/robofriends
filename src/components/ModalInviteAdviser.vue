<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Invite an adviser</h4>
      <span class="subheading1 neutral-500--text">
        Enter the email address
      </span>
    </template>
    <template v-slot:content>
      <TextField
        v-model="email"
        class="mt-2"
        placeholder="Email Address"
        name="email"
      />
    </template>
    <template v-slot:footer>
      <v-spacer></v-spacer>
      <Button text @click="closeModal()">Cancel</Button>
      <Button :loading="isLoading" @click="inviteAdviser">Invite</Button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ModalInviteAdviser",
  components: {
    Modal,
    TextField,
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
      email: "",
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
    inviteAdviser() {
      // this.dialog = false;
      this.$emit("dialogInviteAdviser");
    },
  },
};
</script>

<style></style>
