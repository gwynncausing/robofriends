<template>
  <div id="research-editor-version-history">
    <div class="editor-wrapper">
      <div class="editor-heading">
        <Button text class="back-button">
          <v-icon class="icon-left">mdi-arrow-left</v-icon>
          Back to Research Paper Editor
        </Button>
        <span class="date-time">{{ activeVersion.dateTime }}</span>
        <Button v-show="activeEl !== 0" outlined class="restore-button">
          Restore this version
        </Button>
      </div>
      <div class="editor">
        <EditorNestedReadonly :list="activeVersion.editors" />
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
import EditorNestedReadonly from "@/components/editor/EditorNestedReadonly";
import Button from "@/components/global/Button.vue";

export default {
  name: "ResearchEditorVersionHistory",
  components: {
    EditorNestedReadonly,
    Button,
  },
  props: {},
  data() {
    return {
      activeEl: 0,
      activeVersion: {},
      versions: [
        {
          id: "1",
          dateTime: "July 20, 3:32 PM",
          users: [
            "Cary Legaspi",
            "Rafale Bacalla",
            "Hyksos Gwynn Causing",
            "Wylen Joan Lee",
            "Joshua Rosalijos",
            "Someone Else",
          ],
          editors: [
            {
              id: "123",
              blockType: "heading",
              column: "default",
              children: [],
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
        },
        {
          id: "2",
          dateTime: "November 3, 9:12 AM",
          users: [
            "Cary Legaspi",
            "Rafale Bacalla",
            "Hyksos Gwynn Causing",
            "Wylen Joan Lee",
            "Joshua Rosalijos",
            "Someone Else",
          ],
          editors: [
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
        },
      ],
    };
  },
  beforeMount() {
    this.activeVersion = this.versions[this.activeEl];
  },
  methods: {
    selectVersion: function (index) {
      this.activeEl = index;
      this.activeVersion = this.versions[this.activeEl];
    },
  },
};
</script>

<style lang="scss" scoped>
#research-editor-version-history {
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
