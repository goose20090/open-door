import React from "react";
import { useMutation } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";
import { useToast } from "./useToast";

export function useScheduleMutation(schedule, user) {
  const { addToast } = useToast();
  async function updateSchedule() {
    return fetchWithError(`/api/therapists/${user.id}/schedule`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_schedule: schedule }),
    });
  }

  return useMutation(updateSchedule, {
    onSuccess: () => {
      addToast("scheduleSuccess");
    },
  });
}
