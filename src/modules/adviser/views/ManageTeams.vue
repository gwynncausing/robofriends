<template>
  <div id="manage-teams">
    <div class="main-content-wrapper">
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
      <div id="tabs-content">
        <ChooseTeamHeading
          v-show="$vuetify.breakpoint.mdAndDown"
          :team="teams[activeEl]"
          @showDialog="teamsDialog = true"
        />
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
            <div v-if="hasTeamApprovedProposals" class="buttons-wrapper">
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
              :comment-list="commentList"
              @viewComments="viewComments"
            />

            <EmptyDataTeamResearchPaper v-else />
          </template>
        </Tabs>
      </div>
    </div>
    <SidebarComments
      v-show="commentSidebar"
      :comments="selectedComment.comments"
      @closed="commentSidebar = false"
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
import SidebarComments from "@/components/sidebar/SidebarComments";
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
    SidebarComments,
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
      selectedChips: ["Ongoing"],
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
          id: "123",
          blockType: "heading",
          column: "default",
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
          id: "124",
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
          id: "125",
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
      commentList: [
        {
          blockId: 123,
          comments: [
            {
              first_name: "Jessica",
              last_name: "Reyes",
              datetime: "November 24, 2021",
              message: "Justify this text",
            },
            {
              first_name: "Cary",
              last_name: "Gwapo",
              datetime: "November 24, 2021",
              message: "Happy birthday",
            },
            {
              first_name: "Cary",
              last_name: "Gwapo",
              datetime: "November 24, 2021",
              message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id lorem luctus, placerat orci nec, viverra ante. Donec at odio sed massa finibus interdum sit amet a orci. Vivamus sollicitudin scelerisque interdum.",
            },
          ],
        },
        {
          blockId: 124,
          comments: [
            {
              first_name: "Jessica",
              last_name: "Reyes",
              datetime: "November 24, 2021",
              message: "Justify this text 124",
            },
            {
              first_name: "Cary",
              last_name: "Gwapo",
              datetime: "November 24, 2021",
              message: "Happy birthday 124",
            },
            {
              first_name: "Cary",
              last_name: "Gwapo",
              datetime: "November 24, 2021",
              message:
                "124 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id lorem luctus, placerat orci nec, viverra ante. Donec at odio sed massa finibus interdum sit amet a orci. Vivamus sollicitudin scelerisque interdum.",
            },
          ],
        },
        {
          blockId: 125,
          comments: [
            {
              first_name: "Jessica",
              last_name: "Reyes",
              datetime: "November 24, 2021",
              message: "Justify this text 125",
            },
            {
              first_name: "Cary",
              last_name: "Gwapo",
              datetime: "November 24, 2021",
              message: "Happy birthday 125",
            },
            {
              first_name: "Cary",
              last_name: "Gwapo",
              datetime: "November 24, 2021",
              message:
                "125 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id lorem luctus, placerat orci nec, viverra ante. Donec at odio sed massa finibus interdum sit amet a orci. Vivamus sollicitudin scelerisque interdum.",
            },
          ],
        },
      ],
      selectedComment: {},
      commentSidebar: false,
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

    //* for filtering by status
    filteredTeams() {
      return this.teams.filter((team) =>
        this.selectedChips.includes(team.status)
      );
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

      if (this.memberships.length > 0) this.selectTeam(0, this.teams[0].id);
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
      if (chip.isActive)
        this.selectedChips.splice(this.selectedChips.indexOf(chip.title), 1);
      else this.selectedChips.push(chip.title);
      chip.isActive = !chip.isActive;
    },

    viewComments(comment) {
      this.selectedComment = comment;
      this.commentSidebar = true;
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
      if (status === PROPOSAL.STATUS.APPROVED) {
        this.$router.replace({
          ...this.$route.query,
          tab: "approved-research",
        });
      }
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
}

.teams-list-filter {
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 8px;
}

.main-content-wrapper {
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  width: 100%;
  padding: 36px clamp(20px, 8vw, 240px);

  #tabs-content {
    width: 100%;
  }

  #empty-team-list {
    display: flex;
    height: 75vh;
    width: 18vw;
    justify-content: center;
    align-items: center;
  }

  #team-list {
    margin-top: 72px;
    width: clamp(260px, 18vw, 274px);
  }

  .team-list-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    margin-top: 32px;
    padding: 0px 4px 4px 4px;
    overflow-y: auto;
    height: 75vh;
    .active {
      background: $neutral-50;
    }
  }

  .buttons-wrapper {
    display: flex;
    column-gap: 8px;
    justify-content: flex-end;
    padding-top: 24px;
  }
}
</style>
