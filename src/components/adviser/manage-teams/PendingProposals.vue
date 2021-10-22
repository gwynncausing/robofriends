<template>
  <div class="pending-proposals">
    <Research
      :research="research"
      details-readonly
      show-status
      show-feedback
      @addObjective="addObjective"
      @removeObjective="removeObjective"
    />
    <div class="button-wrapper">
      <Button outlined> Return </Button>
      <Button> Approve </Button>
    </div>
  </div>
</template>

<script>
import Research from "@/components/Research";
import Button from "@/components/global/Button.vue";

export default {
  name: "PendingProposals",
  components: {
    Research,
    Button,
  },
  data() {
    return {
      research: {
        id: "1",
        title: "title",
        description: "description",
        teamName: "Cary & Co.",
        status: "Pending", // ? values: Pending, Approved, Returned
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
.pending-proposals {
  padding-top: 24px;

  .button-wrapper {
    display: flex;
    flex-direction: row;
    column-gap: 16px;
    justify-content: flex-end;
  }
}
</style>
