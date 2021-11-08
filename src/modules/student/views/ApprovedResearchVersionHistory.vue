<template>
  <div id="approved-research-version-history">
    <div class="editor-wrapper">
      <div class="editor-heading">
        <Button text class="back-button">
          <v-icon class="icon-left">mdi-arrow-left</v-icon>
          Back to Approved Research
        </Button>
        <span class="date-time">{{ versions[activeEl].dateTime }}</span>
        <Button v-show="activeEl !== 0" outlined class="restore-button">
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
    <div class="version-list-wrapper">
      <div class="title">Version History</div>
      <div
        v-for="(version, index) in versions"
        :key="version.id"
        class="version"
        :class="{ active: activeEl == index }"
        @click="selectVersion(index)"
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
    </div>
  </div>
</template>

<script>
import EditorTextWithTitleReadonly from "@/components/editor/EditorTextWithTitleReadonly";
import Button from "@/components/global/Button.vue";

export default {
  name: "ApprovedResearchVersionHistory",
  components: {
    EditorTextWithTitleReadonly,
    Button,
  },
  props: {},
  data() {
    return {
      activeEl: 0,
      versions: [
        {
          id: "1",
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
          dateTime: "July 20, 3:32 PM",
          users: [
            "Cary Legaspi",
            "Rafale Bacalla",
            "Hyksos Gwynn Causing",
            "Wylen Joan Lee",
            "Joshua Rosalijos",
            "Someone Else",
          ],
        },
        {
          id: "2",
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
          dateTime: "November 3, 9:12 AM",
          users: [
            "Cary Legaspi",
            "Rafale Bacalla",
            "Hyksos Gwynn Causing",
            "Wylen Joan Lee",
            "Joshua Rosalijos",
            "Someone Else",
          ],
        },
      ],
      editor: {
        id: "version",
        content: ``,
      },
    };
  },
  beforeMount() {
    this.editor.content = this.versions[this.activeEl].content;
  },
  methods: {
    selectVersion: function (index) {
      this.activeEl = index;
      this.editor.content = this.versions[this.activeEl].content;
    },
  },
};
</script>

<style lang="scss">
.container {
  margin: 0px !important;
  padding: 0px !important;
  width: 100% !important;
  max-width: 100% !important;
  overflow-y: hidden;
}
</style>

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

    .editor-heading {
      padding-bottom: 8px;
      width: 80%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding-top: 24px;
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
      width: 80%;
      border: 1px solid $neutral-400;
      border-radius: 4px;
      padding: 0.8rem;
      margin: 0 auto;
    }
  }
  .version-list-wrapper {
    flex: 1;
    border-left: 1px solid $neutral-400;
    overflow-y: auto;
    height: 100vh;
    .title {
      border-bottom: 1px solid $neutral-400;
      padding: 16px;
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
}
</style>
