import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useScheduleQuery(therapistId) {
  return useQuery(
    ["user", "therapist", "schedule"],
    () => fetchWithError(`/api/therapists/${therapistId}/schedule`),
    {
      refetchOnWindowFocus: false,
    }
  );
}
