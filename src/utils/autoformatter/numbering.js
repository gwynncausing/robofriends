import { AlignmentType, LevelFormat } from "docx";

export const numbering = () => {
  return {
    config: [
      {
        reference: "decimal",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "1.27cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 1,
            format: LevelFormat.DECIMAL,
            text: "%2.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "2.54cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 2,
            format: LevelFormat.DECIMAL,
            text: "%3.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "3.81cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 3,
            format: LevelFormat.DECIMAL,
            text: "%4.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "5.08cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 4,
            format: LevelFormat.DECIMAL,
            text: "%5.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "6.35cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 5,
            format: LevelFormat.DECIMAL,
            text: "%6.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "7.62cm",
                  hanging: ".45cm",
                },
              },
            },
          },
        ],
      },
      {
        reference: "bullet",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u25CF",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "1.27cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 1,
            format: LevelFormat.BULLET,
            text: "\u25CF",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "2.54cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 2,
            format: LevelFormat.BULLET,
            text: "\u25CF",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "3.81cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 3,
            format: LevelFormat.BULLET,
            text: "\u25CF",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "5.08cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 4,
            format: LevelFormat.BULLET,
            text: "\u25CF",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "6.35cm",
                  hanging: ".45cm",
                },
              },
            },
          },
          {
            level: 5,
            format: LevelFormat.BULLET,
            text: "\u25CF",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: "7.62cm",
                  hanging: ".45cm",
                },
              },
            },
          },
        ],
      },
    ],
  };
};
