<template>
  <div id="manage-teams">
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
  padding: 24px clamp(20px, 5.5vw, 80px);
}
</style>
