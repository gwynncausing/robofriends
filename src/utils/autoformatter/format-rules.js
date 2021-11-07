/* eslint-disable */
import { Column, PageOrientation, AlignmentType, LevelFormat } from "docx";

//* add more params if necessary
// TODO: review implementation
export const createHeadingStyle = ({
  fontSize = 12,
  color = "000000", // ? "#000000" are both the same?
  bold = false,
  italics = false,
  allCaps = false,
  alignment = AlignmentType.LEFT,
  spacingOptions = {
    before: "6pt",
  },
}) => {
  return {
    run: {
      size: `${fontSize}pt`,
      bold: bold,
      italics: italics,
      allCaps: allCaps,
      color: color,
    },
    paragraph: {
      alignment: alignment,
      spacing: spacingOptions,
    },
  };
};

export const createParagraphStyle = ({
  id,
  name,
  runOptions,
  alignment = AlignmentType.LEFT,
  spacingOptions = {},
}) => {
  return {
    id: id, //
    name: name,
    run: runOptions,
    paragraph: {
      alignment: alignment,
      spacing: spacingOptions,
    },
  };
};

export const createListLevelOptions = ({
  level = 0,
  format = LevelFormat.DECIMAL,
  alignment = AlignmentType.START,
  baseIndentOptions = {
    left: 1.27,
    hanging: 0.45,
  },
}) => {
  return {
    level: level,
    format: format,
    text: LevelFormat.BULLET ? "\u25CF" : `%${level + 1}.`,
    alignment: alignment,
    style: {
      paragraph: {
        indent: {
          left: `${baseIndentOptions.left * (level + 1)}cm`,
          hanging: `${baseIndentOptions.hanging}cm`,
        },
      },
    },
  };
};

export const ACM_FORMAT = {
  document: {
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
  styles: {
    headings: {
      heading1: createHeadingStyle({
        fontSize: 12,
        color: "000000",
        bold: true,
        allCaps: true,
        alignment: AlignmentType.LEFT,
        spacingOptions: { before: "0pt", after: "0pt" },
      }),
      //* HEADING 2
      // TODO: identify default color, currently using "000000" as default
      heading2: createHeadingStyle({
        fontSize: 12,
        bold: true,
        alignment: AlignmentType.LEFT,
        spacingOptions: { before: "0pt", after: "0pt" },
      }),
      //* HEADING 3
      heading3: createHeadingStyle({
        fontSize: 11,
        italics: true,
        alignment: AlignmentType.LEFT,
        spacingOptions: { before: "0pt", after: "0pt" },
      }),
      //* HEADING 4
      heading4: createHeadingStyle({
        fontSize: 11,
        italics: true,
        alignment: AlignmentType.LEFT,
        spacingOptions: { before: "0pt", after: "0pt" },
      }),
      //* HEADING 5
      heading5: createHeadingStyle({
        fontSize: 11,
        italics: true,
        alignment: AlignmentType.LEFT,
        spacingOptions: { before: "0pt", after: "0pt" },
      }),
      //* HEADING 6
      heading6: createHeadingStyle({
        fontSize: 11,
        italics: true,
        alignment: AlignmentType.LEFT,
        spacingOptions: { before: "0pt", after: "0pt" },
      }),
    },
    paragraphs: [
      //* DEFAULT PARAGRAPH - OK
      createParagraphStyle({
        id: "Normal", //
        name: "Normal",
        runOptions: {
          font: "Times New Roman",
          size: "9pt",
          color: "#000000",
        },
        alignment: AlignmentType.JUSTIFIED,
        spacingOptions: { after: "6pt" },
      }),
    ],
    list: {
      ordered: {
        reference: "decimal",
        levels: [0, 1, 2, 3, 4, 5].map((val) =>
          createListLevelOptions({
            level: val,
            baseIndentOptions: {
              left: 1.27,
              hanging: 0.45,
            },
          })
        ),
      },
      unordered: {
        reference: "bullet",
        levels: [0, 1, 2, 3, 4, 5].map((val) =>
          createListLevelOptions({
            level: val,
            format: LevelFormat.BULLET,
            baseIndentOptions: {
              left: 1.27,
              hanging: 0.45,
            },
          })
        ),
      },
    },
  },
};
