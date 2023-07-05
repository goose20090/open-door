import React from "react";
import { useMutation } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useScheduleMutation(schedule, user) {
  async function updateSchedule() {
    return fetchWithError(`/api/therapists/${user.id}/schedule`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_schedule: schedule }),
    });
  }

  return useMutation(updateSchedule);
}
