<template>
  <Modal small :dialog="dialog" @closed="closeModal()">
    <template v-slot:title>
      <h4>Join a team</h4>
      <span class="subheading1 neutral-500--text">
        Enter the team code given by your friend
      </span>
    </template>
    <template v-slot:content>
      <TextField v-model="teamCode" placeholder="Team code" name="team-code" />
    </template>
    <template v-slot:footer>
      <v-spacer></v-spacer>
      <Button text @click="closeModal()">Cancel</Button>
      <Button @click="joinTeam(teamCode)">Submit</Button>
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
  },
  data() {
    return {
      teamCode: "",
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
    joinTeam(code) {
      // this.dialog = false;
      this.$emit("dialogJoinTeam", code);
    },
  },
};
</script>

<style></style>
