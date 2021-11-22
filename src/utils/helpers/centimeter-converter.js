export const convertCMtoPixel = (cm) => {
  cm = cm + "";
  if (cm.endsWith("cm")) cm = parseFloat(cm.slice(0, -2));
  return cm * 37.7952755906;
};
