<template>
  <div>Exports from autoformatter</div>
</template>

<script>
import autoformat from "@/utils/autoformatter/autoformat";
// import sampleV2 from "@/utils/sample-v2.json"; // Heading
// import sampleV3 from "@/utils/sample-v3.json"; // paragraphs
// import sampleV4 from "@/utils/sample-v4.json"; // image
// import sampleV6 from "@/utils/sample-v6.json"; // lists
import { ACM_FORMAT } from "@/utils/autoformatter/format-rules";

export default {
  data() {
    return {
      //
    };
  },

  mounted() {
    // console.log(rules);
    // console.log(sampleV3);
    // console.log(autoformat);
    autoformat.generateDocument(ACM_FORMAT, [
      {
        id: 124,
        content: [
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "TYPESET TEXT" }],
          },
        ],
        blockType: "section",
        users: [],
      },
      {
        id: 125,
        content: [
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Normal or Body Text" }],
          },
        ],
        blockType: "section",
        users: [],
      },
      {
        id: 126,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Please use a 9-point Times Roman font, or other Roman font with serifs, as close as possible in appearance to Times Roman in which these guidelines have been set. The goal is to have a 9-point text, as you see here. Please use sans-serif or non-proportional fonts only for special purposes, such as distinguishing source code text. If Times Roman is not available, try the font named Computer Modern Roman. On a Macintosh, use the font named Times.  Right margins should be justified, not ragged.",
              },
            ],
          },
        ],
        blockType: "text",
        users: [],
      },
    ]);
    // autoformat.generateDocument(ACM_FORMAT, [
    //   sampleV2,
    //   sampleV3,
    //   sampleV4,
    //   sampleV6,
    // ]);
  },
};
</script>

<style></style>
