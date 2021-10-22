<template>
  <div class="test">
    <!-- <ResearchDetails
      :research="research"
      @addObjective="addObjective"
      @removeObjective="removeObjective"
    /> -->
  </div>
</template>

<script>
// import ResearchDetails from "@/components/ResearchDetails";
// import { mapActions, mapGetters } from "vuex";
// import { FETCH_TEST } from "@/store/types/actions";

export default {
  name: "Test",
  // components: {
  //   ResearchDetails,
  // },
  // data: () => ({
  //   research: {
  //     id: "cary1",
  //     title: "Cary title",
  //     description: "Cary descr",
  //     teamName: "Cary & Co.",
  //     status: "Ongoing",
  //     objectives: [
  //       {
  //         text: "Cary obj",
  //         status: "For Revision",
  //       },
  //       {
  //         text: "Cary obj1",
  //         status: "For Revision",
  //       },
  //     ],
  //     categories: ["Cary lang sakalam"],
  //     feedbacks: [
  //       {
  //         id: "cary2",
  //         date: "1/1/2021",
  //         time: "11:00",
  //         text: "Cary",
  //       },
  //     ],
  //   },
  // }),
  computed: {
    // ...mapGetters({
    //   posts: "getTest",
    // }),
  },
  async created() {
    // try {
    //   await this.fetchPosts();
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  },
  methods: {
    // ...mapActions({
    //   fetchPosts: FETCH_TEST,
    // }),
    // addObjective() {
    //   this.research.objectives.push({
    //     text: "",
    //     status: "Ongoing",
    //   });
    // },
    // removeObjective(index) {
    //   this.research.objectives.splice(index, 1);
    // },
  },
};
</script>

<style lang="scss" scoped></style>
