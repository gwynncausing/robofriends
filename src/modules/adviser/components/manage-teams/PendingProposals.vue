<template>
  <div class="pending-proposals">
    <Research
      :research="research"
      @addObjective="addObjective"
      @removeObjective="removeObjective"
    />
  </div>
</template>

<script>
import Research from "@/components/Research";

export default {
  name: "PendingProposals",
  components: {
    Research,
  },
  data: () => ({
    research: {
      id: "1",
      title: "title",
      description: "description",
      teamName: "Cary & Co.",
      status: "Ongoing",
      objectives: ["obj1", "obj2"],
      feedbacks: [
        {
          id: "1",
          date: "1/1/2021",
          time: "11:00",
          text: "Good job!",
        },
      ],
    },
  }),
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
}
</style>
