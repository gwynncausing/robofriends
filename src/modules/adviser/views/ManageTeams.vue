<template>
  <div id="manage-teams">
    <ChooseTeamHeading
      v-show="$vuetify.breakpoint.smAndDown"
      :team="teams[activeEl]"
      @showDialog="teamsDialog = true"
    />
    <Modal :dialog="teamsDialog" @closed="teamsDialog = false">
      <template v-slot:title>
        <div class="teams-list-filter">
          <Chip
            v-for="chip in statusChips"
            :key="chip.title"
            medium
            dark
            :color="chip.color"
            :outlined="!chip.isActive"
            @click="selectChip(chip)"
          >
            {{ chip.title }}
          </Chip>
        </div>
      </template>
      <template v-slot:content>
        <div v-if="hasTeams">
          <CardTeam
            v-for="(team, index) in teams"
            :key="team.id"
            :team="team"
            :index="index"
            :class="{ active: activeEl == index }"
            @select="selectTeam(index, team.id)"
          />
        </div>
        <div v-else class="text-center mt-7">
          <p>You don't have any teams yet.</p>
          <p>
            Please check your
            <router-link :to="{ name: 'Adviser Invitation' }">
              <span class="secondary--text pointer font-bold">
                invitations.
              </span></router-link
            >
          </p>
        </div>
      </template>
    </Modal>
    <div class="flex-wrapper">
      <div v-if="hasTeams" v-show="$vuetify.breakpoint.lgAndUp" id="team-list">
        <div class="teams-list-filter">
          <Chip
            v-for="chip in statusChips"
            :key="chip.title"
            small
            dark
            :color="chip.color"
            :outlined="!chip.isActive"
            @click="selectChip(chip)"
          >
            {{ chip.title }}
          </Chip>
        </div>
        <div class="team-list-wrapper">
          <CardTeam
            v-for="(team, index) in teams"
            :key="team.id"
            :team="team"
            :index="index"
            :class="{ active: activeEl == index }"
            @select="selectTeam(index, team.id)"
          />
        </div>
      </div>
      <div v-else v-show="$vuetify.breakpoint.lgAndUp" id="empty-team-list">
        <div class="text-center">
          <p>You don't have any teams yet.</p>
          <p>
            Please check your
            <router-link :to="{ name: 'Adviser Invitation' }">
              <span class="secondary--text pointer font-bold">
                invitations.
              </span></router-link
            >
          </p>
        </div>
      </div>
      <Tabs active="pending-proposals" :items="items" class="tabs">
        <template v-slot:body-pending-proposals>
          <span v-if="pendingProposalsLoading">Loading...</span>
          <div v-else>
            <PendingProposals
              v-if="hasTeamPendingProposals"
              :pending-proposals="pendingProposals"
              :has-approved-proposal="hasTeamApprovedProposals"
              @updateProposal="updateProposals($event)"
            />
            <EmptyDataTeamProposals
              v-else-if="!hasTeamPendingProposals && hasTeamApprovedProposals"
              content="One of the proposals of this team is already approved. Please check on the approved research tab."
            />
            <EmptyDataTeamProposals
              v-else
              content="This team have not yet submitted any proposals."
            />
          </div>
        </template>
        <template v-slot:body-approved-research>
          <span v-if="approvedProposalsLoading">Loading...</span>
          <div v-else>
            <ApprovedResearch
              v-if="hasTeamApprovedProposals"
              :approved-research="approvedProposals[0]"
            />
            <EmptyDataTeamApprovedResearch v-else />
          </div>
        </template>
        <template v-slot:body-research-paper>
          <div class="buttons-wrapper" v-if="hasTeamApprovedProposals">
            <Button
              v-show="!isMarkedAsComplete"
              @click="markAsCompleteDialog = true"
            >
              Mark as Complete
            </Button>
            <Button v-show="isMarkedAsComplete" outlined>
              Mark as Incomplete
            </Button>
            <Button
              v-show="isMarkedAsComplete && !isPublished"
              @click="publishDialog = true"
            >
              Publish to Research Archive
            </Button>
            <Button v-show="isMarkedAsComplete && isPublished" outlined>
              Unpublish
            </Button>
          </div>
          <ResearchPaper
            v-if="hasTeamApprovedProposals"
            :blocks="researchPaper"
            :is-marked-as-complete="isMarkedAsComplete"
            :is-published="isPublished"
          />
          <EmptyDataTeamResearchPaper v-else />
        </template>
      </Tabs>
    </div>
    <ModalMarkAsComplete
      :dialog-props="markAsCompleteDialog"
      @dialogClose="markAsCompleteDialog = $event"
    />
    <ModalPublish
      :dialog-props="publishDialog"
      @dialogClose="publishDialog = $event"
    />
  </div>
</template>

<script>
import Button from "@/components/global/Button";
import Chip from "@/components/global/Chip";
import Modal from "@/components/modals/Modal";
import ModalMarkAsComplete from "@/components/modals/ModalMarkAsComplete";
import ModalPublish from "@/components/modals/ModalPublish";
import ChooseTeamHeading from "@/components/adviser/manage-teams/ChooseTeamHeading";
import CardTeam from "@/components/adviser/manage-teams/CardTeam";
import Tabs from "@/components/Tabs";

import PendingProposals from "@/components/adviser/manage-teams/PendingProposals";
import ApprovedResearch from "@/components/adviser/manage-teams/ApprovedResearch";
import ResearchPaper from "@/components/adviser/manage-teams/ResearchPaper";
import EmptyDataTeamProposals from "@/components/messages/EmptyDataTeamProposals";
import EmptyDataTeamApprovedResearch from "@/components/messages/EmptyDataTeamApprovedResearch";
import EmptyDataTeamResearchPaper from "@/components/messages/EmptyDataTeamResearchPaper";

import { mapActions, mapGetters } from "vuex";
import { ADVISER_ACTIONS, ADVISER_GETTERS } from "../store/types";
import { MODULES } from "@/utils/constants";
import { PROPOSAL } from "@/utils/constants";

export default {
  name: "ManageTeams",
  components: {
    Button,
    Chip,
    Modal,
    ModalMarkAsComplete,
    ModalPublish,
    ChooseTeamHeading,
    CardTeam,
    Tabs,
    PendingProposals,
    ApprovedResearch,
    ResearchPaper,
    EmptyDataTeamProposals,
    EmptyDataTeamApprovedResearch,
    EmptyDataTeamResearchPaper,
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
      teamsDialog: false,
      markAsCompleteDialog: false,
      publishDialog: false,
      statusChips: [
        {
          title: "Ongoing",
          color: "yellow",
          isActive: true,
        },
        {
          title: "Completed",
          color: "primary",
          isActive: false,
        },
        {
          title: "Published",
          color: "secondary",
          isActive: false,
        },
      ],
      teams: [],
      memberships: [],
      pendingProposals: [],
      pendingProposalsLoading: false,
      approvedProposals: [],
      approvedProposalsLoading: false,
      hasApprovedProposal: false,
      isMarkedAsComplete: false,
      isPublished: false,
      researchPaper: [
        {
          id: "125",
          blockType: "heading",
          column: "default",
          children: [
            {
              id: "126",
              blockType: "text",
              column: "default",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "paragraph",
                    },
                  ],
                },
              ],
            },
          ],
          content: [
            {
              type: "heading",
              content: [
                {
                  type: "text",
                  text: "title",
                },
              ],
            },
          ],
        },

        {
          id: "127",
          blockType: "image",
          column: "default",
          content: [
            {
              type: "heading",
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: "text",
                  text: "sample image title",
                },
              ],
            },
            {
              type: "image",
              attrs: {
                src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
              },
            },
          ],
        },
        {
          id: "128",
          blockType: "table",
          column: "default",
          content: [
            {
              type: "table",
              content: [
                {
                  type: "tableRow",
                  content: [
                    {
                      type: "tableCell",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "tableCell",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "Donec venenatis turpis vitae orci pulvinar sollicitudin.",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableRow",
                  content: [
                    {
                      type: "tableCell",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "tableCell",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "Donec venenatis turpis vitae orci pulvinar sollicitudin.",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      getMemberships: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_MEMBERSHIPS}`,
      getTeam: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_TEAM}`,
    }),

    hasTeams() {
      return this.teams.length > 0;
    },

    hasTeamApprovedProposals() {
      return this.approvedProposals.length > 0;
    },

    hasTeamPendingProposals() {
      return this.pendingProposals.length > 0;
    },
  },

  created() {
    this.initialize();
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

    async initialize() {
      await this.fetchMembership();

      this.memberships = await this.getMemberships;
      this.teams = await this.getTeam;

      for (let membership of this.memberships) {
        const payload = { id: membership.team.id };
        await this.fetchTeam(payload);
      }

      this.selectTeam(0, this.teams[0].id);
    },

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

    selectChip(chip) {
      chip.isActive = !chip.isActive;
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
.teams-list-filter {
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 8px;
}
#manage-teams {
  padding: 24px clamp(20px, 5.5vw, 80px);
  .flex-wrapper {
    display: flex;
    flex-direction: row;
    column-gap: 16px;

    #empty-team-list {
      display: flex;
      height: 75vh;
      width: 300px;
      justify-content: center;
      align-items: center;
    }

    #team-list {
      margin-top: 72px;
    }

    .team-list-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 24px;
      margin-top: 32px;
      padding: 0px 4px 4px 4px;
      overflow-y: auto;
      height: 75vh;
      width: 300px;
      .active {
        background: $neutral-50;
      }
    }

    .tabs {
      flex: 3;
    }

    .buttons-wrapper {
      display: flex;
      column-gap: 8px;
      justify-content: flex-end;
      padding-top: 24px;
    }
  }
}
</style>
