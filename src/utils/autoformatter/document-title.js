import { createParagraph } from "./blocks/text-block";
import { createSection } from "./autoformat";

export const processTitle = (rules, documentProperty, section, title) => {
  const specialDocumentOptions = rules.special.singleColumnContent.document;
  documentProperty.sections.push(section);
  section = createSection({
    documentOptions: specialDocumentOptions,
  });
  let tempContentText = [
    {
      type: "text",
      marks: [{ type: "bold" }],
      text: title ?? "",
    },
  ];
  section.children.push(createParagraph(tempContentText, "DocumentTitle"));
  return section;
};
