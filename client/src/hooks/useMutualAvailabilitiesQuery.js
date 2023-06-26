import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";
import { UserContext } from "../context/user";
import { useContext } from "react";

export function useMutualAvailabilitiesQuery(nonUserId, date, recurring) {
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

  // Check if date is a string, if not convert it
  if (Object.prototype.toString.call(date) !== "[object String]") {
    date = date.toISOString();
  }
  date = date.split("T")[0];

  return useQuery(
    [
      "users",
      "therapists",
      "availability",
      "appointments",
      appointmentType,
      clientId,
      therapistId,
      date,
    ],
    ({ signal }) =>
      fetchWithError(`/api/mutual_availabilities/${clientId}/${therapistId}/${date}/${recurring}`, {
        signal,
      }),
    {
      enabled: !!nonUserId,
      useErrorBoundary: true,
    }
  );
}
