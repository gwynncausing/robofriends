<template>
  <Modal large :dialog="dialog" @closed="closeModal()">
    <template v-slot:content>
      <v-row class="my-md-5 mx-md-3">
        <v-col class="d-flex flex-column pr-md-10" md="7">
          <p class="subheading1 primary--text">Hello, {{ firstName }}!</p>
          <h6>So, you want to create your team?</h6>
          <v-spacer></v-spacer>
          <p>
            Start by choosing an awesome name so that we’ll know what to call
            your team.
          </p>
          <p>Then, invite amazing people to join you.</p>
          <v-spacer></v-spacer>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <!-- <Button text color="neutral-400" @click="closeModal()">Skip</Button> -->
            <Button @click="createYourTeam">Get Started</Button>
          </div>
        </v-col>
        <v-col md="5" class="d-flex align-center justify-end">
          <v-img :src="require('@/assets/group.svg')" />
        </v-col>
      </v-row>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ModalCreateYourTeam",
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
    createYourTeam() {
      // this.dialog = false;
      this.$emit("dialogCreateYourTeam");
    },
  },
};
</script>

<style></style>
