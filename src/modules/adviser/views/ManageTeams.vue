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
          @select="selectTeam"
        />
      </div>
      <Tabs active="pending-proposals" :items="items" class="tabs">
        <template v-slot:body-pending-proposals>
          <PendingProposals
            :pending-proposals="teams[activeEl].pendingProposals"
          />
        </template>
        <template v-slot:body-approved-research>
          <ApprovedResearch
            :approved-research="teams[activeEl].approvedResearch"
          />
        </template>
        <template v-slot:body-research-paper>
          <ResearchPaper />
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
      teams: [
        {
          teamName: "Cary & Co.",
          researchTitle: "",
          members: [
            "Cary Legaspi",
            "Rafale Bacalla",
            "Hyksos Gwynn Causing",
            "Wylen Joan Lee",
            "Joshua Rosalijos",
            "Someone Else",
          ],
          dateTime: "09/05/2021 11:59AM",
          pendingProposals: [
            {
              id: "1",
              researchTitle:
                "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
              content: {
                type: "doc",
                content: [
                  {
                    type: "heading",
                    content: [
                      {
                        type: "text",
                        text: "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Bud is a web application that offers a modern solution where research can be fun, hassle-free, and paperless; helping students and teachers with writing research from start to finish. Inside the app, users will have access to a dashboard for monitoring their progress, can use real time collaboration features to work on their research, can utilize an easy-to-use research editor with auto-formatting to standard research formats (e.g. ACM) and can store completed research papers in the research archive. With Bud, research collaboration, tracking and writing will be made easier and enjoyable without using different applications and creating multiple files.",
                      },
                    ],
                  },
                ],
              },
              status: "Needs Revision",
              dateTime: "",
              feedback: {
                id: "",
                date: "",
                time: "",
                text: "",
              },
            },
            {
              id: "2",
              researchTitle:
                "Isolation and Determination of the Bioremediation Potential of Bunker Sludge Degrading Bacteria from Manila Bay",
              content: {
                type: "doc",
                content: [
                  {
                    type: "heading",
                    content: [
                      {
                        type: "text",
                        text: "Isolation and Determination of the Bioremediation Potential of Bunker Sludge Degrading Bacteria from Manila Bay",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Bunker sludge degrading microorganisms were isolated using enrichment culture technique from the polluted waters of Manila Bay. Water samples were inoculated using liquid mineral media (LAM). Isolates were tentatively identified as Xanthomonas sp.,Alcaligenes sp, Enterobacter sp. and Flavobacterium sp. Two parameters were tested evaluating the biodegradative abilities of individual isolates to degrade bunker sludge and the effect of chicken manure as added source of nitrates and phosphates. Results revealed no significant difference between pure and mixed cultures in ability to degrade",
                      },
                    ],
                  },
                ],
              },
              status: "Rejected",
              dateTimeSubmitted: "",
              feedback: {
                id: "1",
                date: "",
                time: "",
                text: "",
              },
            },
          ],
          approvedResearch: {
            id: "1",
            researchTitle:
              "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  content: [
                    {
                      type: "text",
                      text: "Bud: Gamified Research Management System with Real Time Collaboration and AutoFormatting",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Bud is a web application that offers a modern solution where research can be fun, hassle-free, and paperless; helping students and teachers with writing research from start to finish. Inside the app, users will have access to a dashboard for monitoring their progress, can use real time collaboration features to work on their research, can utilize an easy-to-use research editor with auto-formatting to standard research formats (e.g. ACM) and can store completed research papers in the research archive. With Bud, research collaboration, tracking and writing will be made easier and enjoyable without using different applications and creating multiple files.",
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    };
  },
  methods: {
    selectTeam: function (index) {
      this.activeEl = index;
      console.log(this.activeEl);
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
