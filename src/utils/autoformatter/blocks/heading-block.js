import { Paragraph } from "docx";
import { HEADING_LEVELS } from "../constants";
import { capitalizeFirstLetter } from "../../helpers";

//* OK
export const createHeading = (content = "", level = 1) => {
  content =
    level === 1 ? content.toUpperCase() : capitalizeFirstLetter(content);
  return new Paragraph({
    text: content,
    heading: HEADING_LEVELS[level],
  });
};

//* OK
export const getHeadingNumber = (numberList = [], level, isNested = false) => {
  isNaN(numberList[level - 1])
    ? (numberList[level - 1] = 1)
    : numberList[level - 1]++;
  for (let i = level; i < numberList.length; i++) {
    numberList[i] = 0;
  }
  let number = "";
  if (isNested) {
    for (let i = 0; i < level; i++) {
      number += (numberList[i] ?? "1") + ".";
    }
  } else number = numberList[level - 1];

  return number;
};

export const processHeadingBlock = (rules, item, numberList, section) => {
  for (const childContent of item.content) {
    if (childContent.type === "heading") {
      let headingText = childContent.content?.[0].text;
      let level = childContent.attrs.level;
      if (rules.headingOptions.isNumbered) {
        // * add numbers to heading
        let headingNumber = "";
        if (
          !["abstract", "css concepts", "keywords"].includes(
            headingText?.toLowerCase()
          )
        ) {
          headingNumber = getHeadingNumber(
            numberList,
            level,
            rules.headingOptions.isNestedNumbers
          );
        } else {
          //* if text includes abstract, css concepts or keywords, it is forced to be level 2
          level = 2;
        }
        headingText = `${headingNumber} ${headingText ?? ""}`;
      }
      section.children.push(createHeading(headingText, level));
    }
  }
  return section;
};