<template>
  <div class="proposals">
    <Research
      :research="research"
      :details-readonly="detailsReadonly"
      show-status
      :show-feedback="showFeedback"
      feedback-readonly
      @addObjective="addObjective"
      @removeObjective="removeObjective"
    />
    <div v-show="showButtons" class="button-wrapper">
      <Button>Edit</Button>
    </div>
  </div>
</template>

<script>
import Research from "@/components/Research";
import Button from "@/components/global/Button.vue";

export default {
  name: "Proposals",
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
        status: "NeedsRevision", // ? values: Pending, Approved, Needs Revision
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
  computed: {
    detailsReadonly: function () {
      return this.research.status === "NeedsRevision" ? false : true;
    },
    showFeedback: function () {
      return this.research.status === "Pending" ? false : true;
    },
    showButtons: function () {
      return this.research.status === "NeedsRevision" ? true : false;
    },
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
.proposals {
  padding-top: 24px;
  .button-wrapper {
    padding-top: 24px;
    display: flex;
    flex-direction: row;
    column-gap: 16px;
    justify-content: flex-end;
  }
}
</style>
