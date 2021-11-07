/* eslint-disable */
import {
  AlignmentType,
  LevelFormat,
  Column,
  PageOrientation,
  HeadingLevel,
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

// TODO: create 1 list function to merge bullet and ordered list
export const createOrderedList = (content, level = 0) => {
  const list = [];
  content?.forEach((value) => {
    if (value.type === "listItem") {
      value.content.forEach((content) => {
        if (content.type === "paragraph") {
          list.push(
            new Paragraph({
              children: createParagraphChilren(content.content),
              numbering: {
                reference: "decimal",
                level: level,
              },
            })
          );
        } else if (content.type === "orderedList") {
          const results = createOrderedList(content.content, level + 1);
          results.forEach((result) => list.push(result));
        } else if (content.type === "bulletList") {
          const results = createBulletList(content.content, level + 1);
          results.forEach((result) => list.push(result));
        } else {
          throw "Content is not list";
        }
      });
    }
  });
  return list;
};

// TODO: polish
export const createBulletList = (content, level = 0) => {
  const list = [];
  content?.forEach((value) => {
    if (value.type === "listItem") {
      value.content.forEach((content) => {
        if (content.type === "paragraph") {
          list.push(
            new Paragraph({
              children: createParagraphChilren(content.content),
              numbering: {
                reference: "bullet",
                level: level,
              },
            })
          );
        } else if (content.type === "orderedList") {
          const results = createOrderedList(content.content, level + 1);
          results.forEach((result) => list.push(result));
        } else if (content.type === "bulletList") {
          const results = createBulletList(content.content, level + 1);
          results.forEach((result) => list.push(result));
        } else {
          throw "Content is not list";
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

  return new TextRun({
    text: item.text || "",
    bold: hasBold,
    italics: hasItalic,
    underline: hasUnderline,
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
  const properties = createDocumentProperties(rules);
  const section = createSection({ document: rules.document, children: [] });
  // TODO: create a function called createSectionChildren and insert the code block below
  for (const item of content) {
    for (const content of item.content) {
      if (content.type === "paragraph") {
        section.children.push(createParagraph(content.content));
      } else if (content.type === "heading") {
        section.children.push(
          createHeading(content.content?.[0].text, content.attrs.level)
        );
      } else if (content.type === "orderedList") {
        const results = createOrderedList(content.content);
        results.forEach((result) => section.children.push(result));
      } else if (content.type === "bulletList") {
        const results = createBulletList(content.content);
        results.forEach((result) => section.children.push(result));
      } else if (content.type === "image") {
        const result = await createImage(content.attrs.src);
        section.children.push(result);
      }
    }
  }
  properties.sections.push(section);

  //* anadawan
  // const newSection = {
  //   properties: createSectionProperties({
  //     document: {
  //       page: {
  //         size: {
  //           orientation: PageOrientation.PORTRAIT,
  //           height: "27.94cm",
  //           width: "21.59cm",
  //         },
  //         margin: {
  //           top: "1.9cm",
  //           right: "1.9cm",
  //           bottom: "2.54cm",
  //           left: "1.9cm",
  //         },
  //       },
  //       column: {
  //         count: 1,
  //         space: ".83cm",
  //         equalWidth: true,
  //       },
  //     },
  //     type: SectionType.CONTINUOUS,
  //   }),
  //   children: [...section.children],
  // };
  
  // *anada section
  // properties.sections.push(newSection);
  // properties.sections.push({
  //   properties: createSectionProperties({
  //     document: {
  //       page: {
  //         size: {
  //           orientation: PageOrientation.PORTRAIT,
  //           height: "27.94cm",
  //           width: "21.59cm",
  //         },
  //         margin: {
  //           top: "1.9cm",
  //           right: "1.9cm",
  //           bottom: "2.54cm",
  //           left: "1.9cm",
  //         },
  //       },
  //       column: {
  //         count: 2,
  //         space: ".83cm",
  //         equalWidth: true,
  //       },
  //     },
  //     type: SectionType.CONTINUOUS,
  //   }),
  //   children: [...section.children],
  // });
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
