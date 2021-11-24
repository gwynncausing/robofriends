import { createSection } from "../autoformat";
import { createParagraph } from "./text-block";
import { Paragraph, ImageRun } from "docx";
// column width 8.45cm converted to px
// https://www.unitconverters.net/typography/centimeter-to-pixel-x.htm
const getImageHeightWidth = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve({ height: img.height, width: img.width });
    img.onerror = reject;
    img.src = src;
  });
};

const createImageRun = async (imgUrl, targetWidth) => {
  let height = 0,
    width = 0;
  await getImageHeightWidth(imgUrl).then((obj) => {
    height = obj.height;
    width = obj.width;
  });

  const originalAspectRatio = width / height;

  width = targetWidth;
  height = width / originalAspectRatio;
  return new ImageRun({
    data: await fetch(imgUrl).then((response) => response.blob()),
    transformation: {
      width: width,
      height: height,
    },
  });
};

const getFigureNumber = (imageList = []) => {
  imageList.push("0");
  let figureText = `Figure ${imageList.length}. `;
  return figureText;
};

export const createImage = async (url, targetWidth = 672.37795276) => {
  const imagerun = await createImageRun(url, targetWidth);
  return new Paragraph({
    children: [imagerun],
  });
};

const processImageBlockChildren = async (
  content,
  section,
  imageWidth,
  imageList
) => {
  for (const childContent of content) {
    if (childContent.type === "image" && childContent.attrs.src !== null) {
      const result = await createImage(childContent.attrs.src, imageWidth);
      section.children.push(result);
    } else if (childContent.type === "heading") {
      // * Added due to TextRun probably overrides the bold in paragraph styling
      let tempContentText = [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text:
            getFigureNumber(imageList) +
            (childContent.content?.[0]?.text ?? ""),
        },
      ];

      section.children.push(createParagraph(tempContentText, "FigureStyle"));
    }
  }
};

export const processImageBlock = async (
  rules,
  item,
  documentProperty,
  imageList,
  section
) => {
  // TODO: only do this when rules.figure.label.position == BELOW or something
  let tempContent = item.content.reverse();
  // * Added due to bug that sometimes heading comes first
  if (tempContent[0].type === "heading") tempContent = item.content.reverse();

  if (!!item.column && item.column != "default") {
    // TODO: add try catch and fall back when current rules do not have such special rule
    const specialDocumentOptions = rules.special[item.column].document;
    const specialWidth = specialDocumentOptions.width;

    //*push current since new section has different config
    documentProperty.sections.push(section);
    section = createSection({
      documentOptions: specialDocumentOptions,
    });

    await processImageBlockChildren(
      tempContent,
      section,
      specialWidth,
      imageList
    );

    documentProperty.sections.push(section);
    section = createSection({
      documentOptions: rules.document,
      children: [],
    });
  } else {
    const defaultWidth = rules.defaultContentWidth;
    await processImageBlockChildren(
      tempContent,
      section,
      defaultWidth,
      imageList
    );
  }

  //* return this as for some reason section is pass by value
  return section;
};
