import {
  //   TextRun,
  VerticalPositionAlign,
  HorizontalPositionAlign,
  FrameAnchorType,
  FrameWrap,
  Paragraph,
} from "docx";

export const createACMCopyrightSpace = () =>
  new Paragraph({
    frame: {
      position: {
        x: "2.04cm",
        y: "22.23cm",
      },
      width: "8.25cm",
      height: "3.49cm",
      anchor: {
        horizontal: FrameAnchorType.PAGE,
        vertical: FrameAnchorType.PAGE,
      },
      alignment: {
        x: HorizontalPositionAlign.CENTER,
        y: VerticalPositionAlign.TOP,
      },
      wrap: FrameWrap.AROUND,
    },
    children: [
      //   new TextRun(
      //     "SAMPLE: Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee."
      //   ),
      //   new TextRun({
      //     text: "Conference’10",
      //     italic: true,
      //   }),
      //   new TextRun(", Month 1–2, 2010, City, State, Country."),
      //   new TextRun("Copyright 2010 ACM 1-58113-000-0/00/0010 …$15.00."),
    ],
  });
