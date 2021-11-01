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
    this.createChapterHeading(sampleV2.content[0]);
  },

  methods: {
    saveDoc() {
      console.log("saveDoc called");
      let doc = new Document({
        sections: [],
      });
      doc.addSection({
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
          this.createChapterHeading(sampleV2.content[0]),
          this.createParagraph(sampleV3.content[0]),
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
        alignment: AlignmentType.JUSTIFIED,
      });
    },

    createChapterHeading(object) {
      if (object.type !== "heading") return;
      const HEADING_LEVELS = {
        1: HeadingLevel.HEADING_1,
        2: HeadingLevel.HEADING_2,
        3: HeadingLevel.HEADING_3,
        4: HeadingLevel.HEADING_4,
        5: HeadingLevel.HEADING_5,
        6: HeadingLevel.HEADING_6,
      };
      const objectHeadingLevel = HEADING_LEVELS[object.attrs.level];

      return new Paragraph({
        text: object.content[0].text,
        heading: objectHeadingLevel,
        alignment: AlignmentType.LEFT,
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
