/* eslint-disable */

import {
  Document,
  Packer,
  SectionType,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";

import { saveAs } from "file-saver";
import { processTextBlock, createParagraph, createList } from "./text-block";
import { processHeadingBlock } from "./heading-block";
import { createACMCopyrightSpace } from "./special-elements";
import { processImageBlock } from "./image-block";

// TODO: add implefmentation
const createTableCellsChildren = (content) => {
  let children = [];
  for (const childContent of content) {
    if (childContent.type === "paragraph") {
      children.push(createParagraph(childContent.content));
    } else if (
      childContent.type === "orderedList" ||
      childContent.type === "bulletList"
    ) {
      const results = createList(childContent.content, childContent.type);
      results.forEach((result) => children.push(result));
    }
  }
  return children;
};

const createTableCells = (content) => {
  const tableCell = new TableCell({
    children: createTableCellsChildren(content.content),
    rowSpan: content.attrs.rowspan,
    columnSpan: content.attrs.colspan,
  });
  return tableCell;
};
// TODO: add bold on tableHeader
const createTableRows = (content) => {
  let tableCells = [];
  for (let childContent of content) {
    if (childContent.type === "tableHeader")
      tableCells.push(createTableCells(childContent));
    if (childContent.type === "tableCell")
      tableCells.push(createTableCells(childContent));
  }

  const tableRow = new TableRow({
    children: tableCells,
  });
  return tableRow;
};

export const createTable = (content) => {
  let tableRows = [];
  for (let row of content) {
    if (row.type !== "tableRow") break;
    tableRows.push(createTableRows(row.content));
  }
  const table = new Table({
    rows: tableRows,
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    // TODO: transfer to rules as default cell margins, also allow users to specify this if necessary
    margins: {top: "0.05cm", right: "0.2cm", bottom: "0.05cm",  left: "0.1cm"}
  });
  return table;
};

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
      case "section":
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
        // TODO: add to separate file
        for (const childContent of item.content) {
          if (childContent.type !== "table") break;
          let table = createTable(childContent.content);
          section.children.push(table);
        }
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
