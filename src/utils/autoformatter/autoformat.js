/* eslint-disable */

import {
  // AlignmentType,
  // LevelFormat,
  // Column,
  // PageOrientation,
  // HeadingLevel,
  convertInchesToTwip,
  Paragraph,
  TextRun,
  Document,
  Packer,
  ImageRun,
  SectionType,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";

import { saveAs } from "file-saver";
import { createParagraph, createList } from "./text-block";
import { createHeading, getHeadingNumber } from "./heading-block";

// TODO: add implementation
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
  console.log("children:", createTableCellsChildren(content.content));
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
  });
  return table;
};

const getImageHeightWidth = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve({ height: img.height, width: img.width });
    img.onerror = reject;
    img.src = src;
  });
};

// column width 8.45cm converted to px
// https://www.unitconverters.net/typography/centimeter-to-pixel-x.htm
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
      for (const childContent of item.content) {
        if (childContent.type === "heading") {
          let headingText = childContent.content?.[0].text;
          const level = childContent.attrs.level;
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
      for (const childContent of item.content) {
        if (childContent.type === "paragraph") {
          section.children.push(createParagraph(childContent.content));
        } else if (
          childContent.type === "orderedList" ||
          childContent.type === "bulletList"
        ) {
          const results = createList(childContent.content, childContent.type);
          results.forEach((result) => section.children.push(result));
        }
      }
    } else if (item.blockType === "image") {
      let tempContent = item.content.reverse();
      // * Added due to bug that sometimes heading comes first
      if (tempContent[0].type === "heading")
        tempContent = item.content.reverse();

      for (const childContent of tempContent) {
        if (childContent.type === "image") {
          const result = await createImage(childContent.attrs.src);
          section.children.push(result);
        } else if (childContent.type === "heading") {
          // * Added due to TextRun probably overrides the bold in paragraph styling
          let tempContentText = [
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: childContent.content[0].text,
            },
          ];

          section.children.push(
            createParagraph(tempContentText, "FigureStyle")
          );
        }
      }
    } else if (item.blockType === "table") {
      for (const childContent of item.content) {
        if (childContent.type !== "table") break;
        let table = createTable(childContent.content);
        section.children.push(table);
      }
      // const table = new Table({
      //   rows: [
      //     new TableRow({
      //       children: [
      //         new TableCell({
      //           children: [new Paragraph({})],
      //         }),
      //       ],
      //     }),
      //   ],
      // });
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
