<template>
<<<<<<< HEAD
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
=======
  <v-form ref="form" lazy-validation>
    <Modal small :dialog="dialog" @closed="closeModal()">
      <template v-slot:title>
        <div class="d-block">
          <h4>Invite an adviser</h4>
          <div class="subheading1 neutral-500--text">
            Enter the email address
          </div>
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
        <Button class="px-6" :loading="isLoading" @click="inviteAdviser"
          >Invite</Button
        >
      </template>
    </Modal>
  </v-form>
>>>>>>> feature/tiptap
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
<<<<<<< HEAD
=======
      rules: {
        email: [
          (v) => !!v || "Email is required",
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Invalid Email",
        ],
      },
>>>>>>> feature/tiptap
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
<<<<<<< HEAD
=======
      this.resetForm();
>>>>>>> feature/tiptap
      this.dialog = false;
    },
    inviteAdviser() {
      // this.dialog = false;
<<<<<<< HEAD
      this.$emit("dialogInviteAdviser");
=======
      if (this.$refs.form.validate())
        this.$emit("dialogInviteAdviser", { email: this.email });
    },
    resetForm() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.email = "";
>>>>>>> feature/tiptap
    },
  },
};
</script>

<style></style>
