import { Paragraph, TextRun } from "docx";
import { MARK_TYPE } from "../constants";

//TODO: add string to constants instead
//* OK
const hasMark = (item, markType) =>
  item.marks?.some((mark) => mark.type === markType) || false;

//* OK
export const createTextRun = (item) => {
  const hasBold = hasMark(item, MARK_TYPE.bold);
  const hasItalic = hasMark(item, MARK_TYPE.italic);
  const hasUnderline = hasMark(item, MARK_TYPE.underline);
  const hasSubScript = hasMark(item, MARK_TYPE.subscript);
  const hasSuperScript = hasMark(item, MARK_TYPE.superscript);
  const hasStrike = hasMark(item, MARK_TYPE.strike);
  const hasUri = hasMark(item, MARK_TYPE.link);

  return new TextRun({
    text: item.text || "",
    bold: hasBold,
    italics: hasItalic,
    underline: hasUnderline,
    subScript: hasSubScript,
    superScript: hasSuperScript,
    strike: hasStrike,
    color: hasUri ? "#0000ff" : "#000000",
  });
};

export const createParagraphChilren = (content) => {
  let textRuns = [];

  content?.forEach((child) => {
    textRuns.push(createTextRun(child));
  });

  return textRuns;
};

export const createParagraph = (content, style = "Normal") =>
  new Paragraph({
    children: createParagraphChilren(content),
    style: style,
  });

//* OK
export const createList = (parentContent, parentType, level = 0) => {
  const list = [];

  for (let childContent of parentContent) {
    if (childContent.type === "listItem") {
      for (const grandChild of childContent.content) {
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
      }
    }
  }
  return list;
};

export const processTextBlock = (item, section) => {
  for (const childContent of item.content) {
    if (childContent.type === "paragraph") {
      section.children.push(createParagraph(childContent.content));
    } else if (
      childContent.type === "orderedList" ||
      childContent.type === "bulletList"
    ) {
      const results = createList(childContent.content, childContent.type);
      results.forEach((result) => section.children.push(result));
      section.children.push(
        new Paragraph({ text: "", spacing: { before: "0pt", after: "0pt" } })
      );
    }
  }
  return section;
};
