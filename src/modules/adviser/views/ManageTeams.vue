<template>
  <div id="manage-teams">
    <AppTabsHolder active="pending-proposals" :items="items">
      <template v-slot:body-pending-proposals>
        <PendingProposals />
      </template>
      <template v-slot:body-approved-research>
        <ApprovedResearch />
      </template>
      <template v-slot:body-research-paper>
        <ResearchPaper />
      </template>
    </AppTabsHolder>
  </div>
</template>

<script>
import AppTabsHolder from "@/components/AppTabsHolder";
import PendingProposals from "../components/manage-teams/PendingProposals";
import ApprovedResearch from "../components/manage-teams/ApprovedResearch";
import ResearchPaper from "../components/manage-teams/ResearchPaper";
export default {
  name: "ManageTeams",
  components: {
    AppTabsHolder,
    PendingProposals,
    ApprovedResearch,
    ResearchPaper,
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
    };
  },
};
</script>

<style lang="scss" scoped>
#manage-teams {
  text-align: -webkit-center;
  margin: clamp(14px, 7vw, 24px) 20px 20px 20px !important;
}
</style>
