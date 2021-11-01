<template>
  <div>
    <div>Hello there!</div>
    <v-btn class="green" @click="saveDoc">Click Me</v-btn>
  </div>
</template>

<script>
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  // TabStopPosition,
  // TabStopType,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

import sampleV1 from "@/utils/sample-v1.json";
import sampleV2 from "@/utils/sample-v2.json";
import sampleV3 from "@/utils/sample-v3.json";

export default {
  data() {
    return {
      doc: "",
    };
  },

  mounted() {
    // this.saveDoc();
    // console.log(sample.content);
    console.log(sampleV1);
    console.log(sampleV2);
    console.log(sampleV3);
  },

  methods: {
    saveDoc() {
      console.log("saveDoc called");
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
              // this.createParagraph(sampleV1.content[0]),
              // this.createParagraph(sampleV2.content[0]),
              this.createParagraph(sampleV3.content[0]),
            ],
          },
        ],
      });
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "test.docx");
      });
    },
    createParagraph(object) {
      if (object.type !== "paragraph") return;

      let textRuns = [];
      let hasBold = false,
        hasItalic = false,
        hasUnderline = false;

      object.content.forEach((item) => {
        hasBold = this.isBold(item);
        hasItalic = this.isItalic(item);
        hasUnderline = this.isUnderline(item);

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

    createChapterHeading(object) {
      console.log(object);
      const headingLevels = {
        1: "HEADIING_1",
        2: "HEADIING_2",
        3: "HEADIING_3",
        4: "HEADIING_4",
        5: "HEADIING_5",
        6: "HEADIING_6",
      };
      console.log(headingLevels);
      return new Paragraph({
        text: "Hello World",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      });
    },

    isBold(item) {
      return item.marks?.some((mark) => mark.type === "bold") || false;
    },

    isItalic(item) {
      return item.marks?.some((mark) => mark.type === "italic") || false;
    },

    isUnderline(item) {
      return item.marks?.some((mark) => mark.type === "underline") || false;
    },
  },
};
</script>

<style></style>
