<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Mark as Complete</h4>
    </template>
    <template v-slot:content>
      <div class="pt-3">
        <span class="subheading1 neutral-500--text">
          Confirming this research paper as complete means that the students in
          this team may no longer edit or update their approved research
          proposal, research paper, or any materials.
          <br />
          You may publish this research paper, together with the files, in the
          Research Archive after marking it as complete.
        </span>
      </div>
    </template>
    <template v-slot:footer>
      <v-spacer></v-spacer>
      <Button text @click="closeModal">Cancel</Button>
      <Button :loading="isLoading" @click="confirm"> Confirm </Button>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ModalMarkAsComplete",
  components: {
    Modal,
    Button,
  },
  props: {
    team: {
      type: Object,
      default: () => {},
    },
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
    confirm() {
      //
    },
  },
};
</script>

<style></style>
