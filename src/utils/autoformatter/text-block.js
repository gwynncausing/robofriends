import { Paragraph, TextRun } from "docx";

//TODO: add string to constants instead
//* OK
const hasMark = (item, markType) =>
  item.marks?.some((mark) => mark.type === markType) || false;

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

const createParagraphChilren = (content) => {
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
