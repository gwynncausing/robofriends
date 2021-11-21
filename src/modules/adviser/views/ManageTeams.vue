<template>
  <div id="manage-teams">
    <ChooseTeamHeading
      v-show="$vuetify.breakpoint.mdAndDown"
      :team="teams[activeEl]"
    />
    <div class="flex-wrapper">
      <div v-show="$vuetify.breakpoint.lgAndUp" id="team-list-wrapper">
        <CardTeam
          v-for="(team, index) in teams"
          :key="team.id"
          :team="team"
          :index="index"
          :class="{ active: activeEl == index }"
          @select="selectTeam(index, team.id)"
        />
      </div>
      <Tabs active="pending-proposals" :items="items" class="tabs">
        <template v-slot:body-pending-proposals>
          <span v-if="pendingProposalsLoading">Loading...</span>
          <PendingProposals
            v-else
            :pending-proposals="pendingProposals"
            :has-approved-proposal="hasApprovedProposal"
            @updateProposal="updateProposals($event)"
          />
        </template>
        <template v-slot:body-approved-research>
          <span v-if="approvedProposalsLoading">Loading...</span>
          <ApprovedResearch v-else :approved-research="approvedProposals[0]" />
        </template>
        <template v-slot:body-research-paper>
          <span v-if="!hasApprovedProposal">No Approved Proposal yet</span>
          <ResearchPaper v-else />
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script>
import ChooseTeamHeading from "@/components/adviser/manage-teams/ChooseTeamHeading";
import CardTeam from "@/components/adviser/manage-teams/CardTeam";
import Tabs from "@/components/Tabs";

import PendingProposals from "@/components/adviser/manage-teams/PendingProposals";
import ApprovedResearch from "@/components/adviser/manage-teams/ApprovedResearch";
import ResearchPaper from "@/components/adviser/manage-teams/ResearchPaper";

import { mapActions, mapGetters } from "vuex";
import { ADVISER_ACTIONS, ADVISER_GETTERS } from "../store/types";
import { MODULES } from "@/utils/constants";
import { PROPOSAL } from "@/utils/constants";

export default {
  name: "ManageTeams",
  components: {
    ChooseTeamHeading,
    CardTeam,
    Tabs,
    PendingProposals,
    ApprovedResearch,
    ResearchPaper,
  },
  data() {
    return {
      activeEl: 0,
      currentSelectedTeam: -1,
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
      teams: [],
      memberships: [],
      pendingProposals: [],
      pendingProposalsLoading: false,
      approvedProposals: [],
      approvedProposalsLoading: false,
      hasApprovedProposal: false,
    };
  },

  computed: {
    ...mapGetters({
      getMemberships: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_MEMBERSHIPS}`,
      getTeam: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_TEAM}`,
    }),
  },

  async created() {
    await this.fetchMembership();

    this.memberships = await this.getMemberships;
    this.teams = await this.getTeam;

    for (let membership of this.memberships) {
      const payload = { id: membership.team.id };
      await this.fetchTeam(payload);
    }

    this.selectTeam(0, this.teams[0].id);
  },

  methods: {
    ...mapActions({
      onFetchMembership: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_MEMBERSHIPS}`,
      onFetchTeam: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_TEAM}`,
      onFetchPendingProposals: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_PENDING_PROPOSALS}`,
      onFetchApprovedProposal: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_APPROVED_PROPOSAL}`,
      onFetchOnePendingProposal: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_ONE_PENDING_PROPOSAL}`,
      onFetchOneApprovedProposal: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_ONE_APPROVED_PROPOSAL}`,
      onUpdateProposal: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.UPDATE_PROPOSAL}`,
    }),
    fetchMembership() {
      return this.onFetchMembership();
    },
    fetchTeam(id) {
      return this.onFetchTeam(id);
    },
    fetchPendingProposals(id) {
      return this.onFetchPendingProposals(id);
    },
    fetchApprovedProposal(id) {
      return this.onFetchApprovedProposal(id);
    },
    fetchOnePendingProposal(payload) {
      return this.onFetchOnePendingProposal(payload);
    },
    fetchOneApprovedProposal(payload) {
      return this.onFetchOneApprovedProposal(payload);
    },
    updateProposal(id, status, feedback) {
      return this.onUpdateProposal({
        id,
        status,
        feedback,
        teamId: this.currentSelectedTeam,
      });
    },
    selectTeam(index, team_id) {
      this.activeEl = index;
      this.currentSelectedTeam = team_id;

      this.fetchAndUpdateProposals(this.activeEl, this.currentSelectedTeam);
    },
    async updateProposals({ id, status, feedback }) {
      await this.updateProposal(id, status, feedback);
      if (status === PROPOSAL.STATUS.APPROVED) {
        const status = PROPOSAL.STATUS.REJECTED;
        const feedback = {
          content: "",
        };
        for (let proposal of this.pendingProposals) {
          if (proposal.id !== id) {
            await this.updateProposal(proposal.id, status, feedback);
          }
        }
      }
      this.fetchAndUpdateProposals(this.activeEl, this.currentSelectedTeam);
      this.$router.replace({
        query: { ...this.$route.query, tab: "approved-research" },
      });
    },

    async fetchAndUpdateProposals(index, team_id) {
      this.pendingProposalsLoading = true;
      this.approvedProposalsLoading = true;

      const payload = { id: team_id };

      await this.fetchPendingProposals(payload);
      this.updatePendingProposals(index, team_id);

      await this.fetchApprovedProposal(payload);
      this.updateApprovedProposals(index, team_id);
    },
    async updatePendingProposals(index, team_id) {
      this.pendingProposals = this.teams[index]?.proposals?.pending;
      if (this.pendingProposals) {
        for (let proposal of this.pendingProposals) {
          const payload = { proposalId: proposal.id, teamId: team_id };

          await this.fetchOnePendingProposal(payload);
        }
      }

      this.pendingProposalsLoading = false;
    },
    async updateApprovedProposals(index, team_id) {
      this.approvedProposals = this.teams[index]?.proposals?.approved;
      if (this.approvedProposals) {
        for (let proposal of this.approvedProposals) {
          const payload = { proposalId: proposal.id, teamId: team_id };
          await this.fetchOneApprovedProposal(payload);
        }
      }
      this.approvedProposalsLoading = false;
      if (this.approvedProposals.length > 0) {
        this.hasApprovedProposal = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#manage-teams {
  padding: 24px clamp(20px, 5.5vw, 80px);
  .flex-wrapper {
    display: flex;
    flex-direction: row;
    column-gap: 16px;

    #team-list-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 24px;
      margin-top: 72px;
      padding: 0px 4px 4px 4px;
      overflow-y: auto;
      height: 75vh;
      .active {
        background: $neutral-50;
      }
    }
    .tabs {
      flex: 3;
    }
  }
}
</style>
