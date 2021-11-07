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
} from "docx";

import { saveAs } from "file-saver";
import { HEADING_LEVELS } from "./constants";
import { capitalizeFirstLetter } from "@/utils/helpers";

// TODO: transfer more functions here from docxjstest.vue
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

// TODO: add implementation
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

const hasMark = (item, markType) =>
  item.marks?.some((mark) => mark.type === markType) || false;

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

export const createSectionProperties = (rules) => {
  const sectionProperties = {
    //* DOCUMENT RULES
    // ? i think this should not have default values since it is format specific
    page: rules.document.page,
    column: rules.document.column,
  };
  return sectionProperties;
};

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
    sections: [
      {
        properties: createSectionProperties(rules),
        children: [],
      },
    ],
  };
  return properties;
};

export const generateDocument = async (rules, content) => {
  const properties = createDocumentProperties(rules);
  const sectionChildren = [];
  // TODO: create a function called createSectionChildren and insert the code block below
  for (const item of content) {
    for (const content of item.content) {
      if (content.type === "paragraph") {
        sectionChildren.push(createParagraph(content.content));
      } else if (content.type === "heading") {
        sectionChildren.push(
          createHeading(content.content?.[0].text, content.attrs.level)
        );
      } else if (content.type === "orderedList") {
        const results = createOrderedList(content.content);
        results.forEach((result) => sectionChildren.push(result));
      } else if (content.type === "bulletList") {
        const results = createBulletList(content.content);
        results.forEach((result) => sectionChildren.push(result));
      } else if (content.type === "image") {
        const result = await createImage(content.attrs.src);
        sectionChildren.push(result);
      }
    }
  }

  properties.sections[0].children = sectionChildren;

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
