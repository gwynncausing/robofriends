import moment from "moment";

// datetime -> 2020-12-31T17:00:00Z
// format -> MMM. DD, YYYY
export const parseDateTime = (datetime, format) => {
  return moment(datetime).format(format);
};
