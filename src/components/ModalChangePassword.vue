<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Change Password</h4>
    </template>
    <template v-slot:content>
      <div class="pt-5">
        <TextField
          v-model="passwords.old"
          placeholder="Old Password"
          name="oldPassword"
        />
        <TextField
          v-model="passwords.new"
          placeholder="New Password"
          name="newPassword"
        />
        <TextField
          v-model="passwords.confirm"
          placeholder="Confirm Password"
          name="confirmPassword"
        />
      </div>
    </template>
    <template v-slot:footer>
      <v-spacer></v-spacer>
      <Button text @click="closeModal()">Cancel</Button>
      <Button :loading="isLoading" @click="changePassword">Change</Button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "JoinTeamModal",
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
      passwords: {
        old: "",
        new: "",
        confirm: "",
      },
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
    changePassword() {
      // this.dialog = false;
      this.$emit("changePassword", this.password);
    },
  },
};
</script>

<style></style>
