<template>
  <div class="create-new">
    <Research
      :research="research"
      @addObjective="addObjective"
      @removeObjective="removeObjective"
    />
    <div class="button-wrapper">
      <Button> Submit </Button>
    </div>
  </div>
</template>

<script>
import Research from "@/components/Research";
import Button from "@/components/global/Button.vue";
export default {
  name: "CreateNew",
  components: {
    Button,
    Research,
  },
  data() {
    return {
      research: {
        id: "",
        title: "",
        description: "",
        teamName: "",
        status: "",
        objectives: [""],
        feedback: {
          id: "",
          date: "",
          time: "",
          text: "",
        },
      },
    };
  },
  methods: {
    addObjective() {
      this.research.objectives.push("");
    },
    removeObjective(index) {
      this.research.objectives.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.create-new {
  padding-top: 24px;
  .button-wrapper {
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
