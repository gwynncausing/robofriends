<template>
  <Modal large :dialog="dialog" @closed="closeModal()">
    <template v-slot:content>
      <v-row class="my-md-5 mx-md-3">
        <v-col class="d-flex flex-column pr-md-10" md="7">
          <p class="subheading1 primary--text">Hello, {{ firstName }}!</p>
          <h6>Are you ready to kickstart your research?</h6>
          <v-spacer></v-spacer>
          <p>
            The first step is to create your research proposal and submit it to
            your teacher for feedback.
          </p>
          <p>You can submit as many proposals as you want.</p>
          <v-spacer></v-spacer>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <Button text color="neutral-400" @click="closeModal()">Skip</Button>
            <Button @click="kickstartResearch">Let's go</Button>
          </div>
        </v-col>
        <v-col md="5" class="d-flex align-center justify-end">
          <v-img :src="require('@/assets/paper-magnify.svg')" />
        </v-col>
      </v-row>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "KickstartResearchModal",
  components: {
    Modal,
    Button,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    dialogProps: {
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
    firstName() {
      return this.user.firstName;
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
    kickstartResearch() {
      // this.dialog = false;
      this.$emit("dialogKickstartResearch");
    },
  },
};
</script>

<style></style>
