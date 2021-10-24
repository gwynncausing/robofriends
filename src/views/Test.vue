<template>
  <div class="test">
    <CardTeam :team="team" />
  </div>
</template>

<script>
import CardTeam from "@/components/adviser/manage-teams/CardTeam";
export default {
  name: "Test",
  components: { CardTeam },
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
