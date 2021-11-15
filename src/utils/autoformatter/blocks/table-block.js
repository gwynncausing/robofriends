import { Table, TableCell, TableRow, WidthType } from "docx";
import { createParagraph, createList } from "./text-block";

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
    margins: { top: "0.05cm", right: "0.2cm", bottom: "0.05cm", left: "0.1cm" },
  });
  return table;
};

export const processTableBlock = (item, section) => {
  for (const childContent of item.content) {
    if (childContent.type !== "table") break;
    let table = createTable(childContent.content);
    section.children.push(table);
  }
  return section;
};
