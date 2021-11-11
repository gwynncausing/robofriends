<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Remove Adviser</h4>
    </template>
    <template v-slot:content>
      <div class="pt-3">
        <span class="subheading1 neutral-500--text">
          Are you sure that you want remove {{ fullName }} as your adviser?
        </span>
      </div>
    </template>
    <template v-slot:footer>
      <v-spacer></v-spacer>
      <Button text class="error--text" @click="closeModal()">Cancel</Button>
      <Button class="error" :loading="isLoading" @click="removeAdviser"
        >Remove</Button
      >
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ModalRemoveAdviser",
  components: {
    Modal,
    Button,
  },
  props: {
    adviser: {
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
  computed: {
    fullName() {
      return `${this.adviser.firstName} ${this.adviser.lastName}`;
    },
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
    removeAdviser() {
      // this.dialog = false;
      this.$emit("dialogRemoveAdviser");
    },
  },
};
</script>

<style></style>
