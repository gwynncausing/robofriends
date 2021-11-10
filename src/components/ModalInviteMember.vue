<template>
  <v-form ref="form" lazy-validation>
    <Modal small :dialog="dialog" @closed="closeModal()">
      <template v-slot:title>
        <div class="d-block">
          <h4>Invite a member</h4>
          <span class="subheading1 neutral-500--text">
            Enter the email address
          </span>
        </div>
      </template>
      <template v-slot:content>
        <TextField
          v-model="email"
          class="mt-2"
          placeholder="Email Address"
          name="email"
          :rules="rules.email"
        />
      </template>
      <template v-slot:footer>
        <v-spacer></v-spacer>
        <Button text @click="closeModal()">Cancel</Button>
        <Button :loading="isLoading" @click="inviteMember">Invite</Button>
      </template>
    </Modal>
  </v-form>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ModalInviteMember",
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
      rules: {
        email: [
          (v) => !!v || "Email is required",
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Invalid Email",
        ],
      },
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
      this.resetForm();
    },
    inviteMember() {
      // this.dialog = false;
      if (this.$refs.form.validate()) this.$emit("dialogInviteMmember", { email: this.email });
    },
    resetForm() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.email = "";
    },
  },
};
</script>

<style></style>
