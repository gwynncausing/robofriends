export const capitalizeWords = (string) => {
  return string.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};
