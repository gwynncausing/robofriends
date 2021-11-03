<template>
  <div class="test">
    <CardTeam :team="team" />
    <CardProposal :proposal="proposal" />
  </div>
</template>

<script>
import CardTeam from "@/components/adviser/manage-teams/CardTeam";
import CardProposal from "@/components/student/research-details/CardProposal";
export default {
  name: "Test",
  components: { CardTeam, CardProposal },
  data() {
    return {
      team: {
        teamName: "Cary & Co.",
        researchTitle:
          "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
        members: [
          "Cary Legaspi",
          "Rafale Bacalla",
          "Hyksos Gwynn Causing",
          "Wylen Joan Lee",
          "Joshua Rosalijos",
        ],
        dateTime: "09/05/2021 11:59AM",
      },
      proposal: {
        id: "1",
        researchTitle:
          "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
        content: `<h2>title1</h2><p>paragraph1</p>`,
        status: "Needs Revision",
        dateTime: "09/05/2021 11:59AM",
        feedback: {
          id: "1",
          date: "1/1/2021",
          time: "11:00",
          text: "Good job!",
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
