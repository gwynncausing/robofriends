<template>
  <div class="approved-research">
    <div class="version-button-wrapper">
      <Button outlined> Version History </Button>
    </div>
    <Research
      :research="research"
      @addObjective="addObjective"
      @removeObjective="removeObjective"
    />
    <div class="save-button-wrapper">
      <Button> Save </Button>
    </div>
  </div>
</template>

<script>
import Research from "@/components/Research";
import Button from "@/components/global/Button.vue";
export default {
  name: "ApprovedResearch",
  components: {
    Button,
    Research,
  },
  data() {
    return {
      research: {
        id: "1",
        title: "title",
        description: "description",
        teamName: "Cary & Co.",
        status: "Returned", // ? values: Pending, Approved, Returned
        objectives: ["obj1", "obj2"],
        feedback: {
          id: "1",
          date: "1/1/2021",
          time: "11:00",
          text: "Good job!",
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
.approved-research {
  padding-top: 24px;
  .save-button-wrapper {
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;
  }
  .version-button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
