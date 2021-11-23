<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Publish to Research Archive</h4>
    </template>
    <template v-slot:content>
      <div class="pt-3">
        <span class="subheading1 neutral-500--text">
          Publishing this research paper means the approved research proposal,
          research paper, and its files can be accessed by the users in this
          school. The names of the researchers and the adviser will also be
          shown.
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
  name: "ModalPublish",
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
