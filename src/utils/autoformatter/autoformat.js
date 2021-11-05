import {
  AlignmentType,
  LevelFormat,
  Column,
  PageOrientation,
  HeadingLevel,
  Paragraph,
} from "docx";

// TODO: transfer more functions here from docxjstest.vue

export const createHeading = (content, level) =>
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

// TODO: add implementation
export const createTextRun = () => {};

export const createParagraph = (content, style) =>
  new Paragraph({
    text: content,
    style: style,
  });

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
      }, //* PAGE COLUMNS
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
  };
  return sectionProperties;
};

export const createDocumentProperties = (rules) => {
  // TODO: extract values from rules and leave no hardcoded values if posible (unless applies to all research, then hard coding is justified)
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
      ],
    },
    //* NUMBERING
    numbering: {
      config: [
        {
          reference: "my-crazy-numbering",
          levels: [
            {
              level: 0,
              format: LevelFormat.LOWER_LETTER,
              text: "%1)",
              alignment: AlignmentType.LEFT,
            },
          ],
        },
      ],
    },
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
  // TODO: should loop content here instead of hard coding values, or better if separated into a function called createSectionChildren
  sectionChildren.push(createHeading("Heading1", HeadingLevel.HEADING_1));
  sectionChildren.push(createParagraph("Normal content", "Normal"));

  properties.sections[0].children = sectionChildren;

  // TODO: continue here based on pseudo code

  // TODO: return a Document object based on above values
};

// TODO: once finalized, make this a promise based implementation, we do not want the web client to pause/uninteractable when dealing with huge documents (might take a while and makes it look like the page is unresponsive, see code blocking here https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/)
const autoformat = {
  generateDocument,
  // TODO: add new function here for saving/downloadingi into docx file
};
export default autoformat;
