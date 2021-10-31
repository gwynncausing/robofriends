<template>
  <div>
    <div>Hello there!</div>
    <v-btn class="green" @click="saveDoc">Click Me</v-btn>
  </div>
</template>

<script>
import {
  // AlignmentType,
  Document,
  // HeadingLevel,
  Packer,
  Paragraph,
  // TabStopPosition,
  // TabStopType,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

import sample from "@/utils/sample-content.json";

export default {
  data() {
    return {
      doc: "",
    };
  },

  mounted() {
    // this.saveDoc();
    // console.log(sample.content);
  },

  methods: {
    saveDoc() {
      console.log("saveDoc called");
      // let doc = new Document({
      //   sections: [
      //     {
      //       children: [
      //         new Paragraph({
      //           children: [
      //             new TextRun({
      //               text: "Hi Everyone",
      //             }),
      //           ],
      //         }),
      //       ],
      //     },
      //   ],
      // });
      let doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun("Sample Text"),
                  new TextRun({
                    text: "Sample Text",
                    bold: true,
                    italics: true,
                  }),
                  new TextRun({
                    text: "\tSample Text",
                    bold: true,
                  }),
                ],
              }),
              this.createParagraph(sample.content[0].content),
            ],
          },
        ],
      });

      // doc.addSection({
      //   properties: {},
      //   children: [
      //     new Paragraph({
      //       children: [
      //         new TextRun("SAMPLE"),
      //         new TextRun({
      //           text: "YAA",
      //           bold: true,
      //           italics: true,
      //         }),
      //       ],
      //     }),
      //   ],
      // });

      Packer.toBlob(doc).then((blob) => {
        // console.log(blob);
        saveAs(blob, "test.docx");
      });
      // console.log(this.doc);
    },
    createParagraph(object) {
      let textRuns = [];
      // let item = object[2];
      let hasBold = false,
        hasItalic = false,
        hasUnderline = false;

      object.forEach((item) => {
        hasBold = item.marks?.some((mark) => mark.type === "bold") || false;

        hasItalic = item.marks?.some((mark) => mark.type === "italic") || false;

        hasUnderline =
          item.marks?.some((mark) => mark.type === "underline") || false;

        console.log(item.text);
        console.log("hasBold: ", hasBold);
        console.log("hasItalic: ", hasItalic);
        console.log("hasUnderline: ", hasUnderline);
        console.log("############");

        let textRun = new TextRun({
          text: item.text,
          bold: hasBold,
          italics: hasItalic,
          underline: hasUnderline,
        });
        textRuns.push(textRun);
      });

      return new Paragraph({
        children: textRuns,
      });
    },
  },
};
</script>

<style></style>
