<template>
  <div id="research-details">
    <Tabs active="proposals" :items="items" class="tabs">
      <template v-slot:body-proposals>
        <Proposals />
      </template>
      <template v-slot:body-approved-research>
        <ApprovedResearch />
      </template>
      <template v-slot:body-create-new>
        <CreateNew />
      </template>
    </Tabs>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
import Proposals from "@/components/student/research-details/Proposals";
import ApprovedResearch from "@/components/student/research-details/ApprovedResearch";
import CreateNew from "@/components/student/research-details/CreateNew";
export default {
  name: "ResearchDetails",
  components: {
    Tabs,
    Proposals,
    ApprovedResearch,
    CreateNew,
  },
  data() {
    return {
      items: [
        {
          title: "Proposals",
          value: "proposals",
        },
        {
          title: "Approved Research",
          value: "approved-research",
        },
        {
          title: "Create New",
          value: "create-new",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#research-details {
  padding: 24px clamp(20px, 5.5vw, 80px);
}
</style>
