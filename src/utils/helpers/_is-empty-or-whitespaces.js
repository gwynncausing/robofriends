export const isEmptyOrWhiteSpaces = (string) => {
  return (
    string === null || string === undefined || string.match(/^ *$/) !== null
  );
};
