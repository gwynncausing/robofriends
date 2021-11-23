import { Paragraph } from "docx";
import { createParagraphChilren } from "./text-block";

export const createReferenceList = (parentContent, parentType, level = 0) => {
  const list = [];

  for (let childContent of parentContent) {
    if (childContent.type === "listItem") {
      for (const grandChild of childContent.content) {
        if (grandChild.type === "paragraph") {
          list.push(
            new Paragraph({
              children: createParagraphChilren(grandChild.content),
              numbering: {
                reference: "reference",
                level: level,
              },
            })
          );
        } else {
          const results = createReferenceList(
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

export const processReferenceBlock = (item, section) => {
  for (const childContent of item.content) {
    if (childContent.type === "orderedList") {
      const results = createReferenceList(
        childContent.content,
        childContent.type
      );
      results.forEach((result) => section.children.push(result));
      section.children.push(
        new Paragraph({ text: "", spacing: { before: "0pt", after: "0pt" } })
      );
    }
  }
  return section;
};
