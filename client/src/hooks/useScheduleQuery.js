import { useQuery } from "@tanstack/react-query";

export function useScheduleQuery(therapistId, selectedDate) {
  let dateString = selectedDate.toISOString().split("T")[0];

  async function fetchTherapistSchedule(therapistId, selectedDate) {
    console.log(dateString);
    const res = await fetch(`/api/schedules/${therapistId}?date=${dateString}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  }
  return useQuery(
    ["therapist", "availability", therapistId, dateString],
    () => fetchTherapistSchedule(therapistId, selectedDate),
    {
      enabled: !!therapistId,
    }
  );
}
