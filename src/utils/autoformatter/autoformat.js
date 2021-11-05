/* eslint-disable */
import {
  AlignmentType,
  // LevelFormat,
  Column,
  PageOrientation,
  HeadingLevel,
  Paragraph,
  TextRun,
  Document,
  Packer,
} from "docx";

import { numbering } from "./numbering";

import { saveAs } from "file-saver";

// TODO: transfer more functions here from docxjstest.vue

export const createHeading = (content, level = HeadingLevel.HEADING_1) =>
  new Paragraph({
    text: content,
    heading: level,
  });

// TODO: add implementation
export const createTable = () => {};

// TODO: add implementation
export const createImage = () => {};

// TODO: add implementation
export const createOrderedList = () => {};

// TODO: add implementation
export const createBulletList = () => {};

// TODO: check implementation
export const createTextRun = (item) => {
  const hasBold = hasMark(item, "bold");
  const hasItalic = hasMark(item, "italic");
  const hasUnderline = hasMark(item, "underline");

  return new TextRun({
    text: item.text,
    bold: hasBold,
    italics: hasItalic,
    underline: hasUnderline,
  });
};

// TODO: check implementation
const hasMark = (item, markType) =>
  item.marks?.some((mark) => mark.type === markType) || false;

export const createParagraph = (content, style = "Normal") =>
  new Paragraph({
    children: createParagraphChilren(content),
    style: style,
  });

const createParagraphChilren = (content) => {
  let textRuns = [];

  content.forEach((child) => {
    textRuns.push(createTextRun(child));
  });

  return textRuns;
};

export const createSectionProperties = (rules) => {
  // TODO: extract values from rules and leave no hardcoded values if posible (unless applies to all research, then hard coding is justified)
  const sectionProperties = {
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
    column: {
      count: 2,
      space: ".83cm",
      equalWidth: true,
      children: [
        new Column({ width: "8.45cm" }),
        new Column({ width: "8.45cm" }),
      ],
    },
  };
  return sectionProperties;
};

export const createDocumentProperties = (rules) => {
  // TODO: extract values from rules and leave no hardcoded values if posible (unless applies to all research, then hard coding is justified)
  const properties = {
    creator: rules.creator,
    title: rules.title,
    description: rules.description,
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
        //* HEADING 3 - Capitalized not found
        heading3: {
          run: {
            size: "11pt",
            italics: true,
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
            spacing: {
              before: "6pt",
            },
          },
        },
        //* HEADING 4 - Capitalized not found
        heading4: {
          run: {
            size: "11pt",
            italics: true,
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
            spacing: {
              before: "6pt",
            },
          },
        },
        //* HEADING 5 - Capitalized not found
        heading5: {
          run: {
            size: "11pt",
            italics: true,
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
            spacing: {
              before: "6pt",
            },
          },
        },
        //* HEADING 6 - Capitalized not found
        heading6: {
          run: {
            size: "11pt",
            italics: true,
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
            spacing: {
              before: "6pt",
            },
          },
        },
        // TODO: To be Impemented
        listParagraph: {
          run: {
            color: "#FF0000",
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
        {
          id: "Heading2Subsequent",
          name: "Heading2Subsequent",
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
      ],
    },
    numbering: numbering,
    sections: [
      {
        properties: createSectionProperties(rules),
        children: [],
      },
    ],
  };
  return properties;
};

export const generateDocument = (rules, content) => {
  // TODO: add validation here for rules
  // TODO: add validation here for content
  const properties = createDocumentProperties(rules);

  // TODO: add validation here for section

  const sectionChildren = [];
  // TODO: create a function called createSectionChildren and insert the code block below
  content.forEach((item) => {
    item.content.forEach((content) => {
      if (content.type === "paragraph") {
        sectionChildren.push(createParagraph(content.content));
      } else if (content.type === "heading") {
        sectionChildren.push(createHeading(content.content[0].text));
      }
    });
  });

  properties.sections[0].children = sectionChildren;

  // TODO: continue here based on pseudo code

  // TODO: return a Document object based on above values

  const doc = new Document(properties);

  // * temporary soluton to save
  // saveDocument(doc);
};

const saveDocument = (doc) =>
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "test.docx");
  });

// TODO: once finalized, make this a promise based implementation, we do not want the web client to pause/uninteractable when dealing with huge documents (might take a while and makes it look like the page is unresponsive, see code blocking here https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/)
const autoformat = {
  generateDocument,
  // TODO: add new function here for saving/downloadingi into docx file
};
export default autoformat;
