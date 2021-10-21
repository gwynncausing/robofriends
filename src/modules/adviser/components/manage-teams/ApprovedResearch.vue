<template>
  <div class="approved-research">
    <Research :research="research" readonly approvedresearch />
  </div>
</template>

<script>
import Research from "@/components/Research";
export default {
  name: "ApprovedResearch",
  components: {
    Research,
  },
  data: () => ({
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
  }),
};
</script>

<style lang="scss" scoped>
.approved-research {
  padding-top: 24px;
}
</style>
