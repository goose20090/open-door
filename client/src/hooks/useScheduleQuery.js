import { useQuery } from "@tanstack/react-query";

export function useScheduleQuery(therapistId) {
  async function fetchTherapistSchedule(therapistId) {
    const res = await fetch(`/api/therapists/${therapistId}/schedule`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  }
  return useQuery(
    ["therapist", therapistId, "schedule"],
    () => fetchTherapistSchedule(therapistId),
    {
      enabled: !!therapistId,
    }
  );
}
