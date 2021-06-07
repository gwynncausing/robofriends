export const parseProjectStatus = (status) => {
  const statusCounterparts = {
    NOT_STARTED: "Not Started",
    WAITING_FOR_APPROVAL: "Pending",
    ONGOING: "Ongoing",
    FOR_REVISION: "For Revision",
    FINISHED: "Finished",
  };
  return statusCounterparts[status];
};
