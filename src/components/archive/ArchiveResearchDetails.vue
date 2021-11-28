<template>
  <div id="research-archive-details-wrapper">
    <div id="research-details-info-wrapper">
      <v-row>
        <v-col cols="12">
          <p class="font-semi-bold">Bud</p>
          <p><Chip color="secondary">2021</Chip></p>
          <v-divider class="mt-7"></v-divider>
        </v-col>
        <v-col cols="12">
          <p class="font-semi-bold">Files</p>
          <p v-for="(file, index) in files" :key="index" class="ellipsis">
            {{ file }}
          </p>
          <v-divider class="mt-7"></v-divider>
        </v-col>
        <v-col cols="12">
          <p class="font-semi-bold">Adviser/s</p>
          <p v-for="(adviser, index) in advisers" :key="index" class="ellipsis">
            {{ adviser }}
          </p>
          <v-divider class="mt-7"></v-divider>
        </v-col>
        <v-col cols="12">
          <p class="font-semi-bold">Researcher/s</p>
          <p
            v-for="(researcher, index) in researchers"
            :key="index"
            class="ellipsis"
          >
            {{ researcher }}
          </p>
          <v-divider class="mt-7"></v-divider>
        </v-col>
      </v-row>
    </div>
    <div id="research-details-editor-wrapper">
      <!-- TODO: Add Research Editor Blocks, added a temporary editor block -->
      <EditorNestedReadonly :list="blocks" />
    </div>
  </div>
</template>

<script>
import Chip from "@/components/global/Chip.vue";
import EditorNestedReadonly from "@/components/editor/EditorNestedReadonly";

export default {
  name: "ResearchPaper",
  components: {
    Chip,
    EditorNestedReadonly,
  },
  data() {
    return {
      files: ["Bud_ResearchPaper.file", "Thumbnail.png", "Logo.png"],
      researchers: [
        "Legaspi, Cary",
        "Bacalla, Rafale",
        "Causing, Hyksos Gwynn",
        "Lee, Wylen Joan",
        "Rosalijos, Joshua",
      ],
      advisers: ["Barbaso, Leah", "Larmie, Feliscuzo"],
      blocks: [
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
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      const id = this.$route.params?.id;
      console.log("Id", id);
    },
  },
};
</script>

<style lang="scss" scoped>
#research-archive-details-wrapper {
  display: flex;
  padding: 48px clamp(20px, 8vw, 240px);
  #research-details-info-wrapper {
    max-width: 300px;
    border-right: 1px solid var(--v-neutral-200);
    min-height: 1000px;
    padding-top: 30px;
    padding-right: 20px;
  }
  #research-details-editor-wrapper {
    width: 100%;
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
