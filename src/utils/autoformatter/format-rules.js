/* eslint-disable */
import { Column, PageOrientation, AlignmentType, LevelFormat } from "docx";
import { convertCMtoPixel } from "../helpers/centimeter-converter";

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
  text = `%${level + 1}.`,
  alignment = AlignmentType.START,
  baseIndentOptions = {
    left: 1.27,
    hanging: 0.45,
  },
  spacing = {
    before: 0,
    after: 0,
  },
}) => {
  return {
    level: level,
    format: format,
    text: text,
    alignment: alignment,
    style: {
      paragraph: {
        indent: {
          left: `${baseIndentOptions.left * (level + 1)}cm`,
          hanging: `${baseIndentOptions.hanging}cm`,
        },
        spacing: {
          before: `${spacing.before}pt`,
          after: `${spacing.after}pt`,
        },
      },
    },
  };
};

export const ACM_FORMAT = {
  headingOptions: {
    isNumbered: true,
    isNestedNumbers: true,
  },
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
      children: [],
    },
  },
  defaultContentWidth: convertCMtoPixel("8.45cm"),
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
        id: "Normal",
        name: "Normal",
        runOptions: {
          font: "Times New Roman",
          size: "9pt",
        },
        alignment: AlignmentType.JUSTIFIED,
        spacingOptions: { after: "6pt" },
      }),
      createParagraphStyle({
        id: "FigureStyle",
        name: "Figure Style",
        runOptions: {
          font: "Times New Roman",
          size: "9pt",
        },
        alignment: AlignmentType.CENTER,
        spacingOptions: { after: "6pt" },
      }),
      createParagraphStyle({
        id: "DocumentTitle",
        name: "DocumentTitle",
        runOptions: {
          font: "Helvetica",
          size: "18pt",
        },
        alignment: AlignmentType.CENTER,
        spacingOptions: { after: "3pt" },
      }),
      createParagraphStyle({
        id: "AuthorNameOrEmail",
        name: "Author Name Or Email",
        runOptions: {
          font: "Helvetica",
          size: "12pt",
        },
        alignment: AlignmentType.CENTER,
      }),
      createParagraphStyle({
        id: "AuthorOthers",
        name: "Author other properties",
        runOptions: {
          font: "Helvetica",
          size: "10pt",
        },
        alignment: AlignmentType.CENTER,
      }),
    ],
    list: {
      ordered: {
        reference: "decimal",
        levels: [0, 1, 2, 3, 4, 5].map((val) =>
          createListLevelOptions({
            level: val,
            text: `%${val + 1}`,
            baseIndentOptions: {
              left: 1.27,
              hanging: 0.45,
            },
          })
        ),
      },
      reference: {
        reference: "reference",
        levels: [0, 1, 2, 3, 4, 5].map((val) =>
          createListLevelOptions({
            level: val,
            format: LevelFormat.DECIMAL,
            text: `[%${val + 1}]`,
            baseIndentOptions: {
              left: 1.27,
              hanging: 0.63,
            },
            spacing: {
              before: 0,
              after: 4,
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
            text: "\u25CF",
            baseIndentOptions: {
              left: 1.27,
              hanging: 0.45,
            },
          })
        ),
      },
    },
  },
  special: {
    // TODO: redundant code, to be refactored
    singleColumnContent: {
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
          count: 1,
        },
      },
      width:
        //page size
        convertCMtoPixel("21.59cm") -
        //left margin
        convertCMtoPixel("1.9cm") -
        //right margin
        convertCMtoPixel("1.9cm"),
    },
    tripleColumnContent: {
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
          count: 3,
        },
      },
      width:
        //page size
        convertCMtoPixel("21.59cm") -
        //left margin
        convertCMtoPixel("1.9cm") -
        //right margin
        convertCMtoPixel("1.9cm"),
    },
  },
};
