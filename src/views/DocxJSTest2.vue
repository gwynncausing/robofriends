<template>
  <div>DocxJSTestStyling</div>
</template>

<script>
import {
  AlignmentType,
  // convertInchesToTwip,
  Document,
  HeadingLevel,
  // LevelFormat,
  Packer,
  Paragraph,
  TextRun,
  Column,
  PageOrientation,
  // UnderlineType,
} from "docx";
import { saveAs } from "file-saver";

export default {
  name: "DocxJSTestStyling",
  data() {
    return {
      //
    };
  },

  mounted() {
    const properties = {
      creator: "Clippy",
      title: "Sample Document",
      description: "A brief example of using docx",
      styles: {
        default: {
          //* HEADING 1 - OK
          heading1: {
            run: {
              size: "12pt",
              bold: true,
              allCaps: true,
              color: "000000",
            },
            paragraph: {
              alignment: AlignmentType.LEFT,
              spacing: {
                before: "6pt",
              },
            },
          },
          //* HEADING 2 - Capitalized not found
          heading2: {
            run: {
              size: "12pt",
              bold: true,
            },
            paragraph: {
              alignment: AlignmentType.LEFT,
              spacing: {
                before: "6pt",
              },
            },
          },
        },
        paragraphStyles: [
          //* DEFAULT PARAGRAPH - OK
          {
            id: "Normal",
            name: "Normal",
            run: {
              font: "Times New Roman",
              size: "9pt",
              color: "#000000",
            },
            paragraph: {
              alignment: AlignmentType.JUSTIFIED,
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            //* DOCUMENT RULES
            page: {
              size: {
                orientation: PageOrientation.PORTRAIT,
                height: "27.94cm",
                width: "21.59cm",
              },
              margin: {
                top: "1.9cm",
                right: "1.9cm",
                bottom: "2.54cm",
                left: "1.9cm",
              },
            },
            //* PAGE COLUMNS
            column: {
              count: 2,
              space: ".83cm",
              equalWidth: true,
              children: [
                new Column({ width: "8.45cm" }),
                new Column({ width: "8.45cm" }),
              ],
            },
          },
          children: [
            new Paragraph({
              text: "Test heading1, bold and italicized",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: "Some simple content",
              style: "Normal",
            }),
            new Paragraph({
              text: "Test heading2 with double red underline",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Some monospaced content",
                  font: {
                    name: "Monospace",
                  },
                }),
              ],
            }),
            new Paragraph({
              text: "An aside, in light gray italics and indented",
              style: "aside",
            }),
            new Paragraph({
              text: "This is normal, but well-spaced text",
              style: "wellSpaced",
            }),
            new Paragraph({
              text: "Test heading2 with double red underline and wellSpaced",
              // heading: HeadingLevel.HEADING_2,
              style: "wellSpacedHeading",
            }),
          ],
        },
      ],
    };
    console.log(properties);
    const doc = new Document(properties);

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "test.docx");
    });
  },
};
</script>

<style></style>
