<template>
  <div>Numbered List</div>
</template>

<script>
// import { AlignmentType, Document, LevelFormat, Paragraph, Packer } from "docx";
// import { saveAs } from "file-saver";

import sampleV6 from "@/utils/sample-v6.json";

export default {
  mounted() {
    console.log(sampleV6);
    this.ordered(sampleV6.content[0]);
    // const doc = new Document({
    //   numbering: {
    //     config: [
    //       {
    //         reference: "decimal",
    //         levels: [
    //           {
    //             level: 0,
    //             format: LevelFormat.DECIMAL,
    //             text: "%1.",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "1.27cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 1,
    //             format: LevelFormat.DECIMAL,
    //             text: "%2.",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "2.54cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 2,
    //             format: LevelFormat.DECIMAL,
    //             text: "%3.",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "3.81cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 3,
    //             format: LevelFormat.DECIMAL,
    //             text: "%4.",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "5.08cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 4,
    //             format: LevelFormat.DECIMAL,
    //             text: "%5.",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "6.35cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 5,
    //             format: LevelFormat.DECIMAL,
    //             text: "%6.",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "7.62cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //         ],
    //       },
    //       {
    //         reference: "bullet",
    //         levels: [
    //           {
    //             level: 0,
    //             format: LevelFormat.BULLET,
    //             text: "\u25CF",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "1.27cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 1,
    //             format: LevelFormat.BULLET,
    //             text: "\u25CF",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "2.54cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 2,
    //             format: LevelFormat.BULLET,
    //             text: "\u25CF",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "3.81cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 3,
    //             format: LevelFormat.BULLET,
    //             text: "\u25CF",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "5.08cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 4,
    //             format: LevelFormat.BULLET,
    //             text: "\u25CF",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "6.35cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             level: 5,
    //             format: LevelFormat.BULLET,
    //             text: "\u25CF",
    //             alignment: AlignmentType.START,
    //             style: {
    //               paragraph: {
    //                 indent: {
    //                   left: "7.62cm",
    //                   hanging: ".45cm",
    //                 },
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   sections: [
    //     {
    //       children: [
    //         new Paragraph({
    //           text: "Hey you",
    //           numbering: {
    //             reference: "decimal",
    //             level: 0,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "What's up fam",
    //           numbering: {
    //             reference: "decimal",
    //             level: 1,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Hello World 2",
    //           numbering: {
    //             reference: "decimal",
    //             level: 1,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Yeah boi",
    //           numbering: {
    //             reference: "decimal",
    //             level: 2,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Yeah boi 3",
    //           numbering: {
    //             reference: "decimal",
    //             level: 3,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Yeah boi 4",
    //           numbering: {
    //             reference: "decimal",
    //             level: 4,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Hey you",
    //           numbering: {
    //             reference: "bullet",
    //             level: 0,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "What's up fam",
    //           numbering: {
    //             reference: "bullet",
    //             level: 1,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Hello World 2",
    //           numbering: {
    //             reference: "bullet",
    //             level: 1,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Yeah boi",
    //           numbering: {
    //             reference: "bullet",
    //             level: 2,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Yeah boi 3",
    //           numbering: {
    //             reference: "bullet",
    //             level: 3,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Yeah boi 4",
    //           numbering: {
    //             reference: "bullet",
    //             level: 4,
    //           },
    //         }),
    //       ],
    //     },
    //   ],
    // });

    // Packer.toBlob(doc).then((blob) => {
    //   saveAs(blob, "test.docx");
    // });
  },

  methods: {
    ordered(obj) {
      if (obj.type === "orderedList") console.log("orderedList");
      else {
        console.log("error");
        return;
      }
      let level1Index = 1;
      obj.content.forEach((value) => {
        console.log(level1Index++);
        if (value.type === "listItem") {
          value.content.forEach((content) => {
            if (content.type === "paragraph") {
              console.log("waw: ", content.content[0].text);
            } else if (content.type === "orderedList") {
              this.ordered(content);
            } else if (content.type === "bulletList") {
              this.bullet(content);
            } else {
              console.log("content:", content);
            }
          });
        }
      });
    },
    bullet(obj) {
      if (obj.type === "bulletList") console.log("bulletList");
      else {
        console.log("error");
        return;
      }
      let level1Index = 1;
      obj.content.forEach((value) => {
        console.log(level1Index++);
        if (value.type === "listItem") {
          value.content.forEach((content) => {
            if (content.type === "paragraph") {
              console.log("waw: ", content.content[0].text);
            } else if (content.type === "orderedList") {
              this.ordered(content);
            } else if (content.type === "bulletList") {
              this.bullet(content);
            } else {
              console.log("content:", content);
            }
          });
        }
      });
    },
  },
};
</script>

<style></style>
