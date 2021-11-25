<template>
  <div id="research-details">
    <Tabs active="proposals" :items="researchDetailsItems" class="tabs">
      <template v-slot:body-proposals>
        <Proposals
          v-if="hasProposals"
          :has-approved-research="hasApprovedResearch"
          :proposals="proposalsTab.proposals"
          :selected-proposal="proposalsTab.selectedProposal"
          @selectProposal="fetchSelectedProposal"
          @reviseProposal="reviseProposal"
        />
        <EmptyDataProposals v-else />
      </template>
      <template v-slot:body-approved-research>
        <ApprovedResearch
          v-if="hasApprovedResearch"
          :approved-research="approvedResearchTab.research"
          :is-editable="approvedResearchTab.isEditable"
          :is-completed="isCompleted"
          :y-doc="yDoc"
          :provider="provider"
          @saveProposal="updateApprovedProposal"
          @setEditableClick="approvedResearchTab.isEditable = true"
        />
        <EmptyDataApprovedResearch v-else />
        <Snackbar
          content-class="neutral-800--text"
          :timeout="4000"
          :is-snackbar-shown="approvedResearchTab.isSnackbarShown"
          @closeSnackbar="approvedResearchTab.isSnackbarShown = false"
        >
          <template v-slot:content>
            {{ approvedResearchTab.snackbarMessage }}
          </template>
        </Snackbar>
      </template>
      <template v-slot:body-create-new>
        <CreateNew
          :proposal="createNewTab.proposal"
          :is-completed="isCompleted"
          :y-doc="yDoc"
          :provider="provider"
          :db="db"
          @reset="resetCreateNew"
          @submit="submitProposal"
        />
      </template>
    </Tabs>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
import Proposals from "@/components/student/research-details/Proposals";
import ApprovedResearch from "@/components/student/research-details/ApprovedResearch";
import CreateNew from "@/components/student/research-details/CreateNew";
import EmptyDataProposals from "@/components/messages/EmptyDataProposals";
import EmptyDataApprovedResearch from "@/components/messages/EmptyDataApprovedResearch";
import Snackbar from "@/components/Snackbar";

import { mapActions, mapGetters } from "vuex";
import {
  STUDENT_ACTIONS,
  STUDENT_GETTERS,
} from "@/modules/student/store/types";
import { capitalizeWords, parseDateTime, isObjectEmpty } from "@/utils/helpers";
import { MODULES } from "@/utils/constants";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";

export default {
  name: "ResearchDetails",
  components: {
    Tabs,
    Proposals,
    ApprovedResearch,
    CreateNew,
    EmptyDataProposals,
    EmptyDataApprovedResearch,
    Snackbar,
  },
  data() {
    return {
      createNewTab: {
        proposal: {},
        isUpdateProposal: false,
      },
      proposalsTab: {
        proposals: [],
        selectedProposal: {},
      },
      approvedResearchTab: {
        research: {},
        isSnackbarShown: false,
        snackbarMessage: "",
        isEditable: false,
      },
      items: [
        {
          title: "Proposals",
          value: "proposals",
          isDisabled: false,
        },
        {
          title: "Approved Research",
          value: "approved-research",
          isDisabled: false,
        },
        {
          title: "Create New",
          value: "create-new",
          isDisabled: false,
        },
      ],
      isCompleted: false,
      documentCode: "MyT3@mN@m3Unique6661111" + "-create-proposal",
      yDoc: new Y.Doc(),
      db: null,
      provider: {},
      // TODO: should find a better way to store this like a realtime.config file
      signalingServers: ["ws://bud-api.southeastasia.cloudapp.azure.com:4444/"],
      webrtcPeerOpts: {
        config: {
          iceServers: [
            // { urls: "stun:stun.l.google.com:19302" },
            // { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
            {
              urls: "turn:bud-api.southeastasia.cloudapp.azure.com:3478",
              credential: "budresearchbuddy!",
              username: "bud",
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      getSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS}`,
      getSubmittedProposals: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SUBMITTED_PROPOSALS}`,
      getSelectedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_PROPOSAL}`,
      getApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL}`,
      getApprovedProposalDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL_DETAILS}`,
      getRevisedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_REVISED_PROPOSAL}`,
    }),
    hasProposals() {
      return this.proposalsTab.proposals.length > 0 ? true : false;
    },
    hasApprovedResearch() {
      return !isObjectEmpty(this.approvedResearchTab.research);
    },
    researchDetailsItems() {
      if (this.hasApprovedResearch) {
        return this.items.map((item) => {
          if (item.title === "Create New") return { ...item, isDisabled: true };
          return { ...item };
        });
      } else return this.items;
    },
  },
  created() {
    this.provider = new WebrtcProvider(this.documentCode, this.yDoc, {
      signaling: this.signalingServer,
      maxConns: 50,
      peerOpts: this.webrtcPeerOpts,
    });
    this.db = new IndexeddbPersistence(this.documentCode, this.yDoc);
    this.initializeCreateNewTab();
    this.initializeProposalsTab();
    this.initializeApprovedProposalTab();
  },
  beforeDestroy() {
    this.provider.destroy();
  },
  methods: {
    ...mapActions({
      onFetchSubmittedProposals: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SUBMITTED_PROPOSALS}`,
      onFetchSelectedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SELECTED_PROPOSAL}`,
      onCreateProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.CREATE_PROPOSAL}`,
      onFetchApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL}`,
      onFetchApprovedProposalDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL_DETAILS}`,
      onSetProposalToRevised: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.SET_PROPOSAL_TO_REVISED}`,
      onUpdateApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.UPDATE_PROPOSAL}`,
    }),

    async initializeCreateNewTab() {
      const tab = this.$route.query?.tab;
      const action = this.$route.query?.action;
      if (tab === "create-new" && action === "revision") {
        this.createNewTab.proposal = this.getRevisedProposal.content;
        this.createNewTab.isUpdateProposal = true;
      }
    },

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
        // TODO: Improve Api Error Handling
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
        // TODO: Improve Api Error Handling
        console.log(error);
      }
    },

    async resetCreateNew() {
      await this.onSetProposalToRevised({ proposal: {} });
      this.createNewTab.proposal = {};
    },

    async fetchSelectedProposal(proposal) {
      try {
        await this.onFetchSelectedProposal({ id: proposal.id });
        this.proposalsTab.selectedProposal = {
          ...this.getSelectedProposal,
          status: capitalizeWords(this.getSelectedProposal.status),
        };
      } catch (error) {
        // TODO: Improve Api Error Handling
        console.log(error);
      }
    },

    async reviseProposal(proposal) {
      await this.onSetProposalToRevised({ proposal: proposal });
      this.createNewTab.proposal = proposal.content;
      // * temporary solution to show content in the editor
      window.location.href =
        "/student/research-details?tab=create-new&action=revision";
    },

    async updateApprovedProposal({ title, content }) {
      try {
        const payload = {
          id: this.getApprovedProposal.id,
          proposal: {
            title: title,
            content: content,
            teamId: this.getSelectedTeamDetails.id,
          },
        };
        await this.onUpdateApprovedProposal(payload);
        this.approvedResearchTab.isEditable = false;
        this.approvedResearchTab.isSnackbarShown = true;
        this.approvedResearchTab.snackbarMessage =
          "Changes saved successfully!";
      } catch (error) {
        // TODO: Improve Api Error Handling
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
        if (this.createNewTab.isUpdateProposal === false)
          await this.onSetProposalToRevised({ proposal: {} });
        // * temporary solution to clear content of editor
        window.location.href = "/student/research-details?tab=proposal";
      } catch (error) {
        // TODO: Improve Api Error Handling
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
