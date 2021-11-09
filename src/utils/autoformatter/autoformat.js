import {
  // AlignmentType,
  // LevelFormat,
  // Column,
  // PageOrientation,
  // HeadingLevel,
  Paragraph,
  TextRun,
  Document,
  Packer,
  ImageRun,
  SectionType,
} from "docx";

import { saveAs } from "file-saver";
import { HEADING_LEVELS } from "./constants";
import { capitalizeFirstLetter } from "@/utils/helpers";

export const getHeadingNumber = (numberList = [], level, isNested = false) => {
  isNaN(numberList[level - 1])
    ? (numberList[level - 1] = 1)
    : numberList[level - 1]++;
  for (let i = level; i < numberList.length; i++) {
    numberList[i] = 0;
  }
  let number = "";
  if (isNested) {
    for (let i = 0; i < level; i++) {
      number += numberList[i] + ".";
    }
  } else number = numberList[level - 1];

  return number;
};

//  TODO: blank
export const createHeading = (content = "", level = 1) => {
  content =
    level === 1 ? content.toUpperCase() : capitalizeFirstLetter(content);
  return new Paragraph({
    text: content,
    heading: HEADING_LEVELS[level],
  });
};

// TODO: add implementation
export const createTable = () => {};

const getImageHeightWidth = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve({ height: img.height, width: img.width });
    img.onerror = reject;
    img.src = src;
  });
};

const createImageRun = async (imgUrl, targetWidth = 319.37007874) => {
  let height = 0,
    width = 0;
  await getImageHeightWidth(imgUrl).then((obj) => {
    height = obj.height;
    width = obj.width;
  });

  const originalAspectRatio = width / height;

  width = targetWidth;
  height = width / originalAspectRatio;
  return new ImageRun({
    data: await fetch(imgUrl).then((response) => response.blob()),
    transformation: {
      width: width,
      height: height,
    },
  });
};

// TODO: add implementation
export const createImage = async (url) => {
  const imagerun = await createImageRun(url);
  return new Paragraph({
    children: [imagerun],
  });
};

export const createList = (parentContent, parentType, level = 0) => {
  const list = [];
  parentContent?.forEach((childContent) => {
    if (childContent.type === "listItem") {
      childContent.content.forEach((grandChild) => {
        if (grandChild.type === "paragraph") {
          list.push(
            new Paragraph({
              children: createParagraphChilren(grandChild.content),
              numbering: {
                reference: parentType === "orderedList" ? "decimal" : "bullet",
                level: level,
              },
            })
          );
        } else {
          const results = createList(
            grandChild.content,
            grandChild.type,
            level + 1
          );
          results.forEach((result) => list.push(result));
        }
      });
    }
  });
  return list;
};

//* OK
export const createTextRun = (item) => {
  const hasBold = hasMark(item, "bold");
  const hasItalic = hasMark(item, "italic");
  const hasUnderline = hasMark(item, "underline");
  const hasSubScript = hasMark(item, "subscript");
  const hasSuperScript = hasMark(item, "superscript");
  const hasStrike = hasMark(item, "strike");

  return new TextRun({
    text: item.text || "",
    bold: hasBold,
    italics: hasItalic,
    underline: hasUnderline,
    subScript: hasSubScript,
    superScript: hasSuperScript,
    strike: hasStrike,
  });
};

//* OK
const hasMark = (item, markType) =>
  item.marks?.some((mark) => mark.type === markType) || false;

//TODO: add string to constants instead
export const createParagraph = (content, style = "Normal") =>
  new Paragraph({
    children: createParagraphChilren(content),
    style: style,
  });

const createParagraphChilren = (content) => {
  let textRuns = [];

  content?.forEach((child) => {
    textRuns.push(createTextRun(child));
  });

  return textRuns;
};

//*OK
export const createSectionProperties = ({
  document,
  type = SectionType.CONTINUOUS,
}) => {
  const sectionProperties = {
    //* DOCUMENT RULES
    page: document?.page,
    column: document?.column,
    type: type,
  };
  return sectionProperties;
};

//*OK
const createSection = ({ document, children = [] }) => {
  return {
    properties: createSectionProperties({ document }),
    children: children,
  };
};

//TODO: polish
export const createDocumentProperties = (rules) => {
  const properties = {
    //TODO: should come from content object instead
    creator: rules.creator,
    title: rules.title,
    description: rules.description,
    styles: {
      default: { ...rules.styles.headings },
      paragraphStyles: rules.styles.paragraphs,
    },
    numbering: {
      config: [rules.styles.list.ordered, rules.styles.list.unordered],
    },
    sections: [],
  };
  return properties;
};

//TODO: polish text/heading block related functions
export const generateDocument = async (rules, content) => {
  const numberList = [];
  const properties = createDocumentProperties(rules);
  const section = createSection({ document: rules.document, children: [] });
  // TODO: create a function called createSectionChildren and insert the code block below
  for (const item of content) {
    if (item.blockType === "section" || item.blockType === "heading") {
      for (const innerContent of item.content) {
        if (innerContent.type === "heading") {
          let headingText = innerContent.content?.[0].text;
          const level = innerContent.attrs.level;
          if (rules.headingOptions.isNumbered) {
            // * add numbers to heading
            headingText = `${getHeadingNumber(
              numberList,
              level,
              rules.headingOptions.isNestedNumbers
            )} ${headingText}`;
          }
          section.children.push(createHeading(headingText, level));
        }
      }
    } else if (item.blockType === "text") {
      for (const innerContent of item.content) {
        if (innerContent.type === "paragraph") {
          section.children.push(createParagraph(innerContent.content));
        } else if (
          innerContent.type === "orderedList" ||
          innerContent.type === "bulletList"
        ) {
          const results = createList(innerContent.content, innerContent.type);
          results.forEach((result) => section.children.push(result));
        }
      }
    } else if (item.blockType === "image") {
      let tempContent = item.content.reverse();
      // * Added due to bug that sometimes heading comes first
      if (tempContent[0].type === "heading")
        tempContent = item.content.reverse();

      for (const innerContent of tempContent) {
        if (innerContent.type === "image") {
          const result = await createImage(innerContent.attrs.src);
          section.children.push(result);
        } else if (innerContent.type === "heading") {
          // * Added due to TextRun probably overrides the bold in paragraph styling
          let tempContentText = [
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: innerContent.content[0].text,
            },
          ];

          section.children.push(
            createParagraph(tempContentText, "FigureStyle")
          );
        }
      }
    }

    // for (const [innerIndex, innerContent] of item.content.entries()) {
    //   if (innerContent.type === "paragraph") {
    //     section.children.push(createParagraph(innerContent.content));
    //   } else if (innerContent.type === "heading") {
    //     section.children.push(
    //       createHeading(
    //         innerContent.content?.[0].text,
    //         innerContent.attrs.level
    //       )
    //     );
    //   } else if (innerContent.type === "orderedList") {
    //     const results = createOrderedList(innerContent.content);
    //     results.forEach((result) => section.children.push(result));
    //   } else if (innerContent.type === "bulletList") {
    //     const results = createBulletList(innerContent.content);
    //     results.forEach((result) => section.children.push(result));
    //   } else if (innerContent.type === "image") {
    //     const result = await createImage(innerContent.attrs.src);
    //     section.children.push(result);
    //   }
    // }
  }
  properties.sections.push(section);
  // TODO: continue here based on pseudo code

  // TODO: return a Document object based on above values

  const doc = new Document(properties);

  // * temporary soluton to save
  saveDocument(doc);
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
