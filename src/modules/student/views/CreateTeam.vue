<template>
  <div id="create-team">
    <div class="intro">
      {{ intro }}
    </div>
    <div class="team-name">
      <span>Team Name</span>
      <TextField name="team-name" :rules="rules.teamName" />
    </div>

    <Button />
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
// import { mapGetters } from "vuex";

export default {
  name: "CreateTeam",
  components: {
    TextField,
    Button,
  },
  data() {
    return {
      intro:
        "Hello there! Welcome to Bud. To kickstart your research, choose an awesome name  to call your team and invite amazing people to your team. Then, start your mission to save Philippine forests by selecting a tree to plant and a forest to save.",
      rules: {
        teamName: [(v) => !!v || "Team Name is required"],
      },
    };
  },

  computed: {
    // ...mapGetters({
    //   getUser: "user/getUser",
    // }),
  },

  watch: {
    //
  },

  methods: {
    //
  },
};
</script>

<style lang="scss" scoped>
#create-team {
  max-width: 1252px;
  padding: 40px clamp(20px, 5.5vw, 80px);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(3, auto);
  gap: 24px;
}
.intro {
  line-height: 20px;
  font-weight: bold;
  color: $neutral-800;
}
.team-name {
}
</style>
