import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";
import { UserContext } from "../context/user";
import { useContext } from "react";

// argument 1- the therapist or client the user wants to book an appointment with
// argument 2- if booking a recurring appointment: a week day integer, if not: a date object
// argument 3- a boolean based on whether the user is querying AV for a recurring or single appointment
// argument 4- an id of an appointment that requires rescheduling if this is a reschedule request

export function useMutualAvailabilitiesQuery(
  nonUserId,
  dateOrWeekday,
  recurring,
  reschedule = null
) {
  const { user } = useContext(UserContext);
  const { user_type } = user;
  let clientId;
  let therapistId;
  let appointmentType;

  if (user_type === "Client") {
    clientId = user.id;
    therapistId = nonUserId;
  }

  if (user_type === "Therapist") {
    clientId = nonUserId;
    therapistId = user.id;
  }

  if (recurring) {
    appointmentType = "recurring";
  } else {
    appointmentType = "single";
  }

  // Check if dateOrWeekday is a string, if not convert it
  if (!recurring && Object.prototype.toString.call(dateOrWeekday) !== "[object String]") {
    dateOrWeekday = dateOrWeekday.toISOString().split("T")[0];
  }

  return useQuery(
    [
      "users",
      "therapists",
      "availability",
      "appointments",
      appointmentType,
      clientId,
      therapistId,
      dateOrWeekday,
    ],
    ({ signal }) =>
      fetchWithError(
        `/api/mutual_availabilities/${clientId}/${therapistId}/${recurring}?${
          recurring ? `weekday=${dateOrWeekday}` : `date=${dateOrWeekday}`
        }${reschedule ? `&reschedule=${reschedule}` : ""}`,
        {
          signal,
        }
      ),
    {
      enabled: nonUserId != null && nonUserId != "false",
      useErrorBoundary: true,
      refetchOnWindowFocus: true,
    }
  );
}
