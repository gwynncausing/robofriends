<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Leave Team</h4>
    </template>
    <template v-slot:content>
      <div class="pt-3">
        <span class="subheading1 neutral-500--text">
          Are you sure that you want to leave team<span class="font-bold">
            {{ team.name }}?
          </span>
        </span>
      </div>
    </template>
    <template v-slot:footer>
      <v-spacer></v-spacer>
      <Button text class="error--text" @click="leaveTeam">Leave</Button>
      <Button :loading="isLoading" @click="closeModal()"
        >Stay in this team</Button
      >
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ModalLeaveTeam",
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
    leaveTeam() {
      // this.dialog = false;
      this.$emit("dialogLeaveTeam");
    },
  },
};
</script>

<style></style>
