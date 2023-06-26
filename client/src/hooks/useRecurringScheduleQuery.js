import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";
import { UserContext } from "../context/user";
import { useContext } from "react";

export function useRecurringScheduleQuery(userableId, date, recurring, fullWeek = false) {
  const { user } = useContext(UserContext);
  const { user_type } = user;

  // Query the opposite datatype to the logged in user (i.e. a client will query a therapist's AV)

  let userTypeKey;
  if (user_type == "Client") {
    userTypeKey = "therapists";
  } else if (user_type == "Therapist") {
    userTypeKey = "clients";
  }

  // Check if date is a string, if not convert it
  if (Object.prototype.toString.call(date) !== "[object String]") {
    date.setUTCHours(12);
    date = date.toISOString().split("T")[0];
  }

  return useQuery(
    [userTypeKey, "schedule", userableId, date],
    ({ signal }) =>
      fetchWithError(
        `/api/${userTypeKey}/${userableId}/schedule?&date=${date}&recurring=${recurring}&full_week=${fullWeek}`,
        {
          signal,
        }
      ),
    {
      enabled: !!userableId,
      useErrorBoundary: true,
    }
  );
}
