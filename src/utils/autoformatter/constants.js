import { AlignmentType, HeadingLevel, PageOrientation } from "docx";

// TODO: add more contants here to leave no hard coded values and minimize risk of bugs caused by mispelling
export const HEADING_LEVELS = {
  1: HeadingLevel.HEADING_1,
  2: HeadingLevel.HEADING_2,
  3: HeadingLevel.HEADING_3,
  4: HeadingLevel.HEADING_4,
  5: HeadingLevel.HEADING_5,
  6: HeadingLevel.HEADING_6,
};

export const ALIGNMENT_TYPE = {
  start: AlignmentType.START,
  left: AlignmentType.LEFT,
  right: AlignmentType.RIGHT,
  justified: AlignmentType.JUSTIFIED,
};

export const PAGE_ORIENTATION = {
  portrait: PageOrientation.PORTRAIT,
  landscape: PageOrientation.LANDSCAPE,
};
