<template>
  <div id="research-details">
    <Tabs active="proposals" :items="items" class="tabs">
      <template v-slot:body-proposals>
        <Proposals
          v-if="hasProposals"
          :proposals="proposalsTab.proposals"
          :selected-proposal="proposalsTab.selectedProposal"
          @selectProposal="fetchSelectedProposal"
        />
        <EmptyDataProposals v-else />
      </template>
      <template v-slot:body-approved-research>
        <ApprovedResearch :approved-research="approvedResearchTab.research" />
      </template>
      <template v-slot:body-create-new>
        <CreateNew @submit="submitProposal" />
      </template>
    </Tabs>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
import Proposals from "@/components/student/research-details/Proposals";
import ApprovedResearch from "@/components/student/research-details/ApprovedResearch";
import CreateNew from "@/components/student/research-details/CreateNew";
import EmptyDataProposals from "@/components/student/EmptyDataProposals";

import { mapActions, mapGetters } from "vuex";
import {
  STUDENT_ACTIONS,
  STUDENT_GETTERS,
} from "@/modules/student/store/types";
import { capitalizeWords, parseDateTime, isObjectEmpty } from "@/utils/helpers";
import { MODULES } from "@/utils/constants";

export default {
  name: "ResearchDetails",
  components: {
    Tabs,
    Proposals,
    ApprovedResearch,
    CreateNew,
    EmptyDataProposals,
  },
  data() {
    return {
      createNewTab: {},
      proposalsTab: {
        proposals: [],
        selectedProposal: {},
      },
      approvedResearchTab: {
        research: {},
      },
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
  computed: {
    ...mapGetters({
      getSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS}`,
      getSubmittedProposals: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SUBMITTED_PROPOSALS}`,
      getSelectedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_PROPOSAL}`,
      getApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL}`,
      getApprovedProposalDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL_DETAILS}`,
    }),
    hasProposals() {
      return this.proposalsTab.proposals.length > 0 ? true : false;
    },
  },
  created() {
    this.initializeProposalsTab();
    this.initializeApprovedProposalTab();
  },
  methods: {
    ...mapActions({
      onFetchSubmittedProposals: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SUBMITTED_PROPOSALS}`,
      onFetchSelectedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SELECTED_PROPOSAL}`,
      onCreateProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.CREATE_PROPOSAL}`,
      onFetchApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL}`,
      onFetchApprovedProposalDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL_DETAILS}`,
    }),

    async initializeProposalsTab() {
      try {
        await this.onFetchSubmittedProposals({
          id: this.getSelectedTeamDetails.id,
        });
        this.proposalsTab.proposals = this.getSubmittedProposals.map(
          (proposal) => ({
            id: proposal.id,
            researchTitle: proposal.title,
            status: capitalizeWords(proposal.status),
            dateTime: parseDateTime(proposal.updatedAt, "MM/DD/YYYY hh:mm a"),
          })
        );
        if (this.proposalsTab.proposals.length > 0)
          this.fetchSelectedProposal(this.proposalsTab.proposals[0]);
      } catch (error) {
        console.log(error);
      }
    },

    async initializeApprovedProposalTab() {
      try {
        await this.onFetchApprovedProposal({
          id: this.getSelectedTeamDetails.id,
        });
        if (!isObjectEmpty(this.getApprovedProposal)) {
          await this.onFetchApprovedProposalDetails({
            id: this.getApprovedProposal.id,
          });
          this.approvedResearchTab.research = {
            ...this.getApprovedProposalDetails,
            researchTitle: this.getApprovedProposalDetails.title,
          };
        } else this.approvedResearchTab.research = {};
      } catch (error) {
        console.log(error);
      }
    },

    async fetchSelectedProposal(proposal) {
      try {
        await this.onFetchSelectedProposal({ id: proposal.id });
        this.proposalsTab.selectedProposal = {
          ...this.getSelectedProposal,
          status: capitalizeWords(this.getSelectedProposal.status),
        };
      } catch (error) {
        console.log(error);
      }
    },

    async submitProposal(proposal) {
      try {
        this.isSubmittingProposal = true;
        let payload = {
          id: this.getSelectedTeamDetails.id,
          proposal: { ...proposal, teamId: this.getSelectedTeamDetails.id },
        };
        await this.onCreateProposal(payload);
        // * temporary solution to clear content of editor
        window.location.href = "/student/research-details?tab=proposal";
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmittingProposal = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#research-details {
  padding: 24px clamp(20px, 5.5vw, 80px);
}
</style>
