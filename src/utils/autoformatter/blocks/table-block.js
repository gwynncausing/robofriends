/* eslint-disable */
import { Table, TableCell, TableRow, WidthType } from "docx";
import { createParagraph, createList } from "./text-block";
import { createImage } from "./image-block";
import { createSection } from "../autoformat";

const createTableCellsChildren = async (content) => {
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
    } else if (childContent.type === "image") {
      const result = await createImage(childContent.attrs.src);
      children.push(result);
    }
  }
  return children;
};

const createTableCells = async (content) => {
  const tableCell = new TableCell({
    children: await createTableCellsChildren(content.content),
    rowSpan: content.attrs.rowspan,
    columnSpan: content.attrs.colspan,
  });
  return tableCell;
};

// TODO: add bold on tableHeader
const createTableRows = async (content) => {
  let tableCells = [];
  for (let childContent of content) {
    if (childContent.type === "tableHeader")
      tableCells.push(await createTableCells(childContent));
    if (childContent.type === "tableCell")
      tableCells.push(await createTableCells(childContent));
  }

  const tableRow = new TableRow({
    children: tableCells,
  });
  return tableRow;
};

export const createTable = async (content) => {
  let tableRows = [];
  for (let row of content) {
    if (row.type !== "tableRow") break;
    tableRows.push(await createTableRows(row.content));
  }
  const table = new Table({
    rows: tableRows,
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    // TODO: transfer to rules as default cell margins, also allow users to specify this if necessary
    margins: { top: "0.05cm", right: "0.2cm", bottom: "0.05cm", left: "0.1cm" },
  });
  return table;
};

const getTableNumber = (tableList = []) => {
  tableList.push("0");
  let figureText = `Table ${tableList.length}. `;
  return figureText;
};

const processTableBlockChildren = async (item, section, tableList) => {
  for (const childContent of item.content) {
    if (childContent.type === "heading") {
      let tempContentText = [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text:
            getTableNumber(tableList) + (childContent.content?.[0]?.text ?? ""),
        },
      ];
      section.children.push(createParagraph(tempContentText, "FigureStyle"));
    } else if (childContent.type === "table") {
      let table = await createTable(childContent.content);
      section.children.push(table);
    }
  }
};

export const processTableBlock = async (
  rules,
  item,
  documentProperty,
  tableList,
  section
) => {
  if (!!item.column && item.column != "default") {
    // TODO: add try catch and fall back when current rules do not have such special rule
    const specialDocumentOptions = rules.special[item.column].document;

    documentProperty.sections.push(section);
    section = createSection({
      documentOptions: specialDocumentOptions,
    });
    await processTableBlockChildren(item, section, tableList);

    documentProperty.sections.push(section);
    section = createSection({
      documentOptions: rules.document,
      children: [],
    });
  } else {
    await processTableBlockChildren(item, section, tableList);
  }
  return section;
};
