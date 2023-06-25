import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useScheduleQuery(id, selectedDate, loggedInUserType) {
  let userTypeKey;

  // Query the opposite datatype to the logged in user

  if (loggedInUserType == "Client") {
    userTypeKey = "therapists";
  } else if (loggedInUserType == "Therapist") {
    userTypeKey = "clients";
  } else {
    throw new Error("No user type has been passed to the query");
  }
  selectedDate.setUTCHours(12);
  let dateString = selectedDate.toISOString().split("T")[0];

  return useQuery(
    [userTypeKey, "schedule", id, dateString],
    ({ signal }) =>
      fetchWithError(`/api/${userTypeKey}/${id}/schedule/?date=${dateString}`, { signal }),
    {
      enabled: !!id,
      useErrorBoundary: true,
    }
  );
}
