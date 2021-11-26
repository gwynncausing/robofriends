<template>
  <div id="approved-research-version-history">
    <div class="editor-wrapper">
      <div class="editor-heading">
        <Button
          text
          class="back-button"
          :to="{
            name: 'Research Details',
            query: { tab: 'approved-research' },
          }"
        >
          <v-icon class="icon-left">mdi-arrow-left</v-icon>
          Back to Approved Research
        </Button>
        <span class="date-time">{{ versionDateTime }}</span>
        <Button
          v-show="activeEl !== 0"
          outlined
          class="restore-button"
          @click="restoreVersion"
        >
          Restore this version
        </Button>
      </div>
      <div class="editor">
        <EditorTextWithTitleReadonly
          v-model="editor.content"
          :editor-data="editor"
        />
      </div>
    </div>
    <Sidebar>
      <template v-slot:title> Version History</template>
      <template v-slot:content>
        <div
          v-for="(version, index) in versions"
          :key="version.id"
          class="version"
          :class="{ active: activeEl == index }"
          @click="selectVersion(version, index)"
        >
          <span class="date">{{ version.dateTime }}</span>
          <span v-show="index === 0" class="current-version-label overline">
            Current Version
          </span>
          <p>
            <span
              v-for="(user, userIndex) in version.users"
              :key="userIndex"
              class="user caption"
            >
              {{ user }},
            </span>
          </p>
        </div>
      </template>
    </Sidebar>
  </div>
</template>

<script>
import EditorTextWithTitleReadonly from "@/components/editor/EditorTextWithTitleReadonly";
import Button from "@/components/global/Button.vue";
import Sidebar from "@/components/global/Sidebar.vue";

import { mapActions, mapGetters } from "vuex";
import {
  STUDENT_ACTIONS,
  STUDENT_GETTERS,
} from "@/modules/student/store/types";
import { parseDateTime } from "@/utils/helpers";
import { MODULES } from "@/utils/constants";

export default {
  name: "ApprovedResearchVersionHistory",
  components: {
    EditorTextWithTitleReadonly,
    Button,
    Sidebar,
  },
  props: {},
  data() {
    return {
      activeEl: 0,
      isLoadingApprovedProposalContent: true,
      selectedProposal: {},
      versions: [
        // {
        //   id: "1",
        //   content: {
        //     type: "doc",
        //     content: [
        //       {
        //         type: "heading",
        //         content: [
        //           {
        //             type: "text",
        //             text: "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
        //           },
        //         ],
        //       },
        //       {
        //         type: "paragraph",
        //         content: [
        //           {
        //             type: "text",
        //             text: "Bud is a web application that offers a modern solution where research can be fun, hassle-free, and paperless; helping students and teachers with writing research from start to finish. Inside the app, users will have access to a dashboard for monitoring their progress, can use real time collaboration features to work on their research, can utilize an easy-to-use research editor with auto-formatting to standard research formats (e.g. ACM) and can store completed research papers in the research archive. With Bud, research collaboration, tracking and writing will be made easier and enjoyable without using different applications and creating multiple files.",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   dateTime: "July 20, 3:32 PM",
        //   users: [
        //     "Cary Legaspi",
        //     "Rafale Bacalla",
        //     "Hyksos Gwynn Causing",
        //     "Wylen Joan Lee",
        //     "Joshua Rosalijos",
        //     "Someone Else",
        //   ],
        // },
        // {
        //   id: "2",
        //   content: {
        //     type: "doc",
        //     content: [
        //       {
        //         type: "heading",
        //         content: [
        //           {
        //             type: "text",
        //             text: "Isolation and Determination of the Bioremediation Potential of Bunker Sludge Degrading Bacteria from Manila Bay",
        //           },
        //         ],
        //       },
        //       {
        //         type: "paragraph",
        //         content: [
        //           {
        //             type: "text",
        //             text: "Bunker sludge degrading microorganisms were isolated using enrichment culture technique from the polluted waters of Manila Bay. Water samples were inoculated using liquid mineral media (LAM). Isolates were tentatively identified as Xanthomonas sp.,Alcaligenes sp, Enterobacter sp. and Flavobacterium sp. Two parameters were tested evaluating the biodegradative abilities of individual isolates to degrade bunker sludge and the effect of chicken manure as added source of nitrates and phosphates. Results revealed no significant difference between pure and mixed cultures in ability to degrade",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   dateTime: "November 3, 9:12 AM",
        //   users: [
        //     "Cary Legaspi",
        //     "Rafale Bacalla",
        //     "Hyksos Gwynn Causing",
        //     "Wylen Joan Lee",
        //     "Joshua Rosalijos",
        //     "Someone Else",
        //   ],
        // },
      ],
      editor: {
        id: "version",
        content: {
          content: null,
          type: "doc",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      getSelectedTeamDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_SELECTED_TEAM_DETAILS}`,
      getApprovedProposalHistory: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL_HISTORY}`,
      getApprovedProposalHistorySelectedDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_GETTERS.GET_APPROVED_PROPOSAL_HISTORY_SELECTED_DETAILS}`,
    }),
    versionDateTime() {
      return parseDateTime(
        this.selectedProposal?.updatedAt,
        "MMMM DD, YYYY hh:mm a"
      );
    },
  },
  // beforeMount() {
  //   this.editor.content = this.versions[this.activeEl].content;
  // },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions({
      onFetchApprovedProposalHistory: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL_HISTORY}`,
      onFetchApprovedProposalHistorySelectedDetails: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_APPROVED_PROPOSAL_HISTORY_SELECTED_DETAILS}`,
      onFetchSelectedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.FETCH_SELECTED_PROPOSAL}`,
      onUpdateApprovedProposal: `${MODULES.STUDENT_MODULE_PATH}${STUDENT_ACTIONS.UPDATE_PROPOSAL}`,
    }),

    async initialize() {
      try {
        const payload = {
          teamId: this.getSelectedTeamDetails.id,
        };
        await this.onFetchApprovedProposalHistory(payload);
        this.versions = this.getApprovedProposalHistory.map((proposal) => ({
          ...proposal,
          dateTime: parseDateTime(proposal.updatedAt, "MMMM DD, YYYY hh:mm a"),
          users: [
            "Cary Legaspi",
            "Rafale Bacalla",
            "Hyksos Gwynn Causing",
            "Wylen Joan Lee",
            "Joshua Rosalijos",
            "Someone Else",
          ],
        }));
        const approvedProposalHistorySelected =
          this.getApprovedProposalHistory[0];
        this.selectVersion(approvedProposalHistorySelected, 0);
      } catch (error) {
        // improve error handling
        console.log(error);
      }
    },

    async fetchApprovedProposalHistorySelectedDetails(proposal) {
      try {
        this.isLoadingApprovedProposalContent = true;
        await this.onFetchApprovedProposalHistorySelectedDetails({
          proposalId: proposal.id,
        });
        this.selectedProposal = this.getApprovedProposalHistorySelectedDetails;
      } catch (error) {
        // TODO: Improve Api Error Handling
        console.log(error);
      } finally {
        this.isLoadingApprovedProposalContent = false;
      }
    },

    restoreVersion() {
      console.log(this.selectedProposal);
    },

    selectVersion: async function (version, index) {
      this.activeEl = index;
      await this.fetchApprovedProposalHistorySelectedDetails(version);
      this.editor.content = this.selectedProposal.content;
    },
  },
};
</script>

<style lang="scss" scoped>
#approved-research-version-history {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  .editor-wrapper {
    flex: 4;
    display: flex;
    flex-direction: column;
    padding: 36px clamp(20px, 8vw, 240px);

    .editor-heading {
      padding-bottom: 8px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      .back-button {
        justify-self: start;
      }
      .date-time {
        align-self: center;
        justify-self: center;
      }
      .restore-button {
        justify-self: end;
      }
    }
    .editor {
      display: flex;
      border: 1px solid $neutral-400;
      border-radius: 4px;
      padding: 0.8rem;
    }
  }

  .version {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid $neutral-400;
    .date {
      font-weight: $font-weight-bold;
    }
    p {
      margin: 0px;
    }
    .current-version-label {
      color: $primary;
    }
  }
  .active {
    background-color: $neutral-50;
  }
}
</style>
