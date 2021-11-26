/* eslint-disable */

import { Document, Packer, SectionType } from "docx";

import { saveAs } from "file-saver";
import { processTextBlock, createParagraph } from "./blocks/text-block";
import { processHeadingBlock } from "./blocks/heading-block";
import { processImageBlock } from "./blocks/image-block";
import { processTableBlock } from "./blocks/table-block";
import { processReferenceBlock } from "./blocks/reference-block";
import { createACMCopyrightSpace } from "./special-elements";
import { authorDetails } from "./constants";

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
      config: [
        rules.styles.list.ordered,
        rules.styles.list.unordered,
        rules.styles.list.reference,
      ],
    },
    sections: [],
  };
  return properties;
};

// TODO: move to another JS file
// TODO: needs refractoring
const processThreeAuthors = (
  rules,
  documentProperty,
  section,
  filteredMembers,
  school
) => {
  const specialDocumentOptions = rules.special.tripleColumnContent.document;
  documentProperty.sections.push(section);
  section = createSection({
    documentOptions: specialDocumentOptions,
  });

  for (let authorIndex = 0; authorIndex < 3; authorIndex++) {
    for (const detail of authorDetails) {
      let style = "AuthorOthers";
      if (detail === "name" || detail === "email") style = "AuthorNameOrEmail";
      section.children.push(createParagraph([{ text: "TEST" }], style));
    }
  }

  documentProperty.sections.push(section);
  section = createSection({
    documentOptions: rules.document,
    children: [],
  });

  return section;
};

// TODO: add spacing before section
const processTwoAuthors = (
  rules,
  documentProperty,
  section,
  filteredMembers,
  school
) => {
  for (let authorIndex = 0; authorIndex < 2; authorIndex++) {
    for (const detail of authorDetails) {
      let style = "AuthorOthers";
      if (detail === "name" || detail === "email") style = "AuthorNameOrEmail";
      section.children.push(createParagraph([{ text: "TEST" }], style));
    }
  }

  documentProperty.sections.push(section);
  section = createSection({
    documentOptions: rules.document,
    children: [],
  });

  return section;
};

const processAnAuthor = (
  rules,
  documentProperty,
  section,
  filteredMembers,
  school
) => {
  const specialDocumentOptions = rules.special.singleColumnContent.document;

  //*push current since new section has different config
  documentProperty.sections.push(section);
  section = createSection({
    documentOptions: specialDocumentOptions,
  });

  for (const detail of authorDetails) {
    let text = null;
    switch (detail) {
      case "name":
        text = `${filteredMembers[0].firstName} ${filteredMembers[0].lastName}`;
        break;
      case "affiliation":
        text = school.name;
        break;
      case "address":
        text = school.address;
        break;
      case "phone":
        text = school.phone;
        break;
      case "email":
        text = filteredMembers[0].email;
        break;
      default:
        break;
    }
    console.log({ text });
    let tempContentText = [
      {
        text: text,
      },
    ];
    let style = "AuthorOthers";
    if (detail === "name" || detail === "email") style = "AuthorNameOrEmail";
    if (text) section.children.push(createParagraph(tempContentText, style));
  }

  documentProperty.sections.push(section);
  section = createSection({
    documentOptions: rules.document,
    children: [],
  });

  return section;
};

const filterMembers = (team) => {
  const members = team.members;
  let filteredMembers = [];
  for (let index = 0; index < team.members.length; index++) {
    console.log(members[index]);
    if (members[index].baseRole !== "adviser") {
      filteredMembers.push(members[index].user);
    }
  }
  return filteredMembers;
};

const processAuthors = (rules, documentProperty, section, team, school) => {
  let currentMemberCount = team.memberCount;
  const filteredMembers = filterMembers(team);

  if (currentMemberCount === 1) {
    section = processAnAuthor(
      rules,
      documentProperty,
      section,
      filteredMembers,
      school
    );
  } else if (currentMemberCount === 2) {
    section = processTwoAuthors(
      rules,
      documentProperty,
      section,
      filteredMembers,
      school
    );
  }

  if (team.memberCount - 3 >= 0) {
    for (let index = 0; index < Math.ceil(team.memberCount / 3); index++) {
      if (currentMemberCount >= 3) {
        section = processThreeAuthors(
          rules,
          documentProperty,
          section,
          filteredMembers,
          school
        );
        currentMemberCount -= 3;
      } else if (currentMemberCount === 2) {
        section = processTwoAuthors(
          rules,
          documentProperty,
          section,
          filteredMembers,
          school
        );
      } else if (currentMemberCount === 1) {
        section = processAnAuthor(
          rules,
          documentProperty,
          section,
          filteredMembers,
          school
        );
      }
    }

    documentProperty.sections.push(section);
    section = createSection({
      documentOptions: rules.document,
      children: [],
    });
  }

  return section;
};

export const generateDocument = async (rules, content, school, team) => {
  const numberList = [];
  const imageList = [];
  const tableList = [];
  const properties = createDocumentProperties(rules);
  let section = createSection({
    documentOptions: rules.document,
    children: [],
  });
  section = processAuthors(rules, properties, section, team, school);
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
        section = await processImageBlock(
          rules,
          item,
          properties,
          imageList,
          section
        );
        break;
      case "table":
        section = await processTableBlock(
          rules,
          item,
          properties,
          tableList,
          section
        );
        break;
      case "reference":
        section = processReferenceBlock(item, section);
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
