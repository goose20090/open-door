import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useAvailabilityQuery(therapistId) {
  return useQuery(
    ["user", "therapist", "schedule", "availability"],
    () => fetchWithError(`/api/${therapistId}/schedule/availability`),
    {
      refetchOnWindowFocus: false,
    }
  );
}
