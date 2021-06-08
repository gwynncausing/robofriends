export const PROJECT_NOT_STARTED = "not_started";
export const PROJECT_PENDING = "waiting_for_approval";
export const PROJECT_ONGOING = "ongoing";
export const PROJECT_FOR_REVISION = "for_revision";
export const PROJECT_FINISHED = "finished";

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
