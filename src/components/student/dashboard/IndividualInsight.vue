<template>
  <div class="card-insight-wrapper py-10 px-2">
    <CardInsight
      v-for="(member, id) in members"
      :key="id"
      :user="member.user"
      :bud-coins-earned="member.budCoinsEarned"
      :new-tasks="member.newTasks"
      :ongoing-tasks="member.ongoingTasks"
      :completed-tasks="member.completedTasks"
    ></CardInsight>
  </div>
</template>

<script>
import CardInsight from "@/components/CardInsight.vue";

export default {
  name: "IndividualInsight",
  components: {
    CardInsight,
  },
  data() {
    return {
      members: [
        {
          user: {
            firstName: "Firstname1",
            lastName: "Lastname1",
            lastActive: "Last 10 mins ago",
            image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          },
          budCoinsEarned: 25,
          newTasks: [{ name: "New Task 1" }, { name: "New task 2" }],
          ongoingTasks: [
            { name: "Ongoing Task 1" },
            { name: "Ongoing Task 2" },
            { name: "Ongoing Task 3" },
          ],
          completedTasks: [{ name: "Completed Task 1" }],
        },
        {
          user: {
            firstName: "Firstname2",
            lastName: "Lastname2",
            lastActive: "Last 15 mins ago",
            image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          },
          budCoinsEarned: 25,
          newTasks: [{ name: "New Task 1" }, { name: "New task 2" }],
          ongoingTasks: [
            { name: "Ongoing Task 1" },
            { name: "Ongoing Task 2" },
            { name: "Ongoing Task 3" },
            { name: "Ongoing Task 4" },
            { name: "Ongoing Task 5" },
          ],
          completedTasks: [{ name: "Completed Task 1" }],
        },
        {
          user: {
            firstName: "Firstname3",
            lastName: "Lastname3",
            lastActive: "Last 12 mins ago",
            image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          },
          budCoinsEarned: 25,
          newTasks: [{ name: "New Task 1" }, { name: "New task 2" }],
          ongoingTasks: [
            { name: "Ongoing Task 1" },
            { name: "Ongoing Task 2" },
            { name: "Ongoing Task 3" },
            { name: "Ongoing Task 4" },
          ],
          completedTasks: [{ name: "Completed Task 1" }],
        },
        {
          user: {
            firstName: "Firstname4",
            lastName: "Lastname4",
            lastActive: "Last 8 mins ago",
            image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          },
          budCoinsEarned: 25,
          newTasks: [{ name: "New Task 1" }, { name: "New task 2" }],
          ongoingTasks: [
            { name: "Ongoing Task 1" },
            { name: "Ongoing Task 2" },
          ],
          completedTasks: [{ name: "Completed Task 1" }],
        },
        {
          user: {
            firstName: "Firstname5",
            lastName: "Lastname5",
            lastActive: "Last 6 mins ago",
            image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          },
          budCoinsEarned: 25,
          newTasks: [{ name: "New Task 1" }, { name: "New task 2" }],
          ongoingTasks: [
            { name: "Ongoing Task 1" },
            { name: "Ongoing Task 2" },
            { name: "Ongoing Task 3" },
            { name: "Ongoing Task 4" },
            { name: "Ongoing Task 5" },
          ],
          completedTasks: [{ name: "Completed Task 1" }],
        },
      ],
    };
  },
};
</script>

<style>
.card-insight-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px;
}
</style>
