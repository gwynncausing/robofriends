/* eslint-disable */

import { Document, Packer, SectionType } from "docx";

import { saveAs } from "file-saver";
import { processTextBlock } from "./blocks/text-block";
import { processHeadingBlock } from "./blocks/heading-block";
import { processImageBlock } from "./blocks/image-block";
import { processTableBlock } from "./blocks/table-block";
import { createACMCopyrightSpace } from "./special-elements";

//*OK
export const createSectionProperties = ({ documentOptions, type }) => {
  const sectionProperties = {
    page: documentOptions?.page,
    column: documentOptions?.column,
    type: type,
  };
  return sectionProperties;
};

//*OK
export const createSection = ({
  documentOptions,
  type = SectionType.CONTINUOUS,
  children = [],
}) => {
  return {
    properties: createSectionProperties({ documentOptions, type }),
    children: children,
  };
};

//TODO: polish this, and should accept a content for creator, title, description
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

export const generateDocument = async (rules, content) => {
  const numberList = [];
  const properties = createDocumentProperties(rules);
  let section = createSection({
    documentOptions: rules.document,
    children: [],
  });

  // TODO: add indicator to only add this if the user wants to
  // TODO: add check for format name e.g. if rules.name === ACM
  section.children.push(createACMCopyrightSpace());

  //* Process each item
  for (const item of content) {
    switch (item.blockType) {
      case "heading":
        processHeadingBlock(rules, item, numberList, section);
        break;
      case "text":
        processTextBlock(item, section);
        break;
      case "image":
        section = await processImageBlock(rules, item, properties, section);
        break;
      case "table":
        section = await processTableBlock(rules, item, properties, section);
        break;
    }
  }
  properties.sections.push(section);

  const doc = new Document(properties);
  // TODO: return document object
  // * temporary soluton to save
  saveDocument(doc);
};

const saveDocument = (doc) =>
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "test.docx");
  });

// TODO: once finalized, make this a promise based implementation
const autoformat = {
  generateDocument,
  // TODO: add new function here for saving/downloadingi into docx file
};
export default autoformat;
