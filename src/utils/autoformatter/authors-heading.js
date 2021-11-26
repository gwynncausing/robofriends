import { createParagraph } from "./blocks/text-block";
import { authorDetails } from "./constants";
import { createSection } from "./autoformat";

const filterMembers = (team) => {
  const members = team.members;
  let filteredMembers = [];
  for (let index = 0; index < team.members.length; index++) {
    //* uncomment if adviser is not included
    // if (members[index].baseRole !== "adviser")
    filteredMembers.push(members[index].user);
  }
  return filteredMembers;
};

export const processRowAuthors = (
  rules,
  documentProperty,
  section,
  filteredMembers,
  school,
  totalNumberOfAuthors,
  currentIndexOfAuthors = 0
) => {
  let specialDocumentOptions = "";

  const authorsLeft = totalNumberOfAuthors - currentIndexOfAuthors;
  if (authorsLeft === 1) {
    specialDocumentOptions = rules.special.singleColumnContent.document;
  } else if (authorsLeft === 2) {
    specialDocumentOptions = rules.special.doubleColumnContent.document;
  } else if (authorsLeft >= 3) {
    specialDocumentOptions = rules.special.tripleColumnContent.document;
  }

  documentProperty.sections.push(section);
  section = createSection({
    documentOptions: specialDocumentOptions,
  });

  for (
    let authorIndex = currentIndexOfAuthors, count = 0;
    authorIndex < totalNumberOfAuthors && count < 3;
    authorIndex++, count++
  ) {
    for (const detail of authorDetails) {
      let text = null;
      switch (detail) {
        case "name":
          text = `${filteredMembers[authorIndex].firstName} ${filteredMembers[authorIndex].lastName}`;
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
          text = filteredMembers[authorIndex].email;
          break;
        default:
          break;
      }
      let tempContentText = [
        {
          text: text,
        },
      ];
      let style = "AuthorOthers";
      if (detail === "name" || detail === "email") style = "AuthorNameOrEmail";
      if (text) section.children.push(createParagraph(tempContentText, style));
    }
  }

  return section;
};

export const processAuthors = (
  rules,
  documentProperty,
  section,
  team,
  school
) => {
  const filteredMembers = filterMembers(team);
  let currentMemberCount = filteredMembers.length;
  const totalMemberCount = currentMemberCount;
  let _authorIndex = 0;

  if (currentMemberCount < 3) {
    section = processRowAuthors(
      rules,
      documentProperty,
      section,
      filteredMembers,
      school,
      totalMemberCount,
      _authorIndex
    );
    documentProperty.sections.push(section);
    section = createSection({
      documentOptions: rules.document,
      children: [],
    });

    return section;
  }

  for (
    let rowIndex = 0;
    rowIndex < Math.ceil(totalMemberCount / 3);
    rowIndex++
  ) {
    if (currentMemberCount >= 3) {
      section = processRowAuthors(
        rules,
        documentProperty,
        section,
        filteredMembers,
        school,
        totalMemberCount,
        _authorIndex
      );
      _authorIndex += 3;
      currentMemberCount -= 3;
    } else {
      section = processRowAuthors(
        rules,
        documentProperty,
        section,
        filteredMembers,
        school,
        totalMemberCount,
        _authorIndex
      );
    }
    documentProperty.sections.push(section);
    section = createSection({
      documentOptions: rules.document,
      children: [],
    });
  }

  return section;
};
