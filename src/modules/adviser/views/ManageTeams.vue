<template>
  <div id="manage-teams">
    <TeamList />
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
// import TeamCard from "@/components/TeamCard";
import Tabs from "@/components/Tabs";
import PendingProposals from "../components/manage-teams/PendingProposals";
import ApprovedResearch from "../components/manage-teams/ApprovedResearch";
import ResearchPaper from "../components/manage-teams/ResearchPaper";
export default {
  name: "ManageTeams",
  components: {
    Tabs,
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
  margin: clamp(14px, 7vw, 24px) 20px 20px 20px !important;
}
</style>
