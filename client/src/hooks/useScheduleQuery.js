import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useScheduleQuery(therapistId, selectedDate) {
  selectedDate.setUTCHours(12);
  let dateString = selectedDate.toISOString().split("T")[0];

  return useQuery(
    ["therapist", "schedule", therapistId, dateString],
    ({ signal }) => fetchWithError(`/api/schedules/${therapistId}?date=${dateString}`, { signal }),
    {
      enabled: !!therapistId,
      useErrorBoundary: true,
    }
  );
}
