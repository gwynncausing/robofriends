<template>
  <div id="manage-teams">
    <ChooseTeam :team="team" />
    <Tabs active="pending-proposals" :items="items" class="tabs">
      <template v-slot:body-pending-proposals>
        <PendingProposals />
      </template>
      <template v-slot:body-approved-research>
        <ApprovedResearch />
      </template>
      <template v-slot:body-research-paper>
        <ResearchPaper />
      </template>
    </Tabs>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";

import PendingProposals from "@/components/adviser/manage-teams/PendingProposals";
import ApprovedResearch from "@/components/adviser/manage-teams/ApprovedResearch";
import ResearchPaper from "@/components/adviser/manage-teams/ResearchPaper";
import ChooseTeam from "@/components/adviser/manage-teams/ChooseTeam";
export default {
  name: "ManageTeams",
  components: {
    Tabs,
    PendingProposals,
    ApprovedResearch,
    ResearchPaper,
    ChooseTeam,
  },
  data() {
    return {
      items: [
        {
          title: "Pending Proposals",
          value: "pending-proposals",
        },
        {
          title: "Approved Research",
          value: "approved-research",
        },
        {
          title: "Research Paper",
          value: "research-paper",
        },
      ],
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
          "Someone Else",
        ],
        dateTime: "09/05/2021 11:59AM",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
#manage-teams {
  padding: 24px clamp(20px, 5.5vw, 80px);
}
</style>
