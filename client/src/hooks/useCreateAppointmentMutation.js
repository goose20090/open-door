import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";
import { useToast } from "./useToast";
import { formatRecurringTime } from "../helpers/formatRecurringTime";
import { formatSingleDate } from "../helpers/formatSingleDate";

export function useCreateAppointment(onCloseDialog) {
  const { user, setUser } = useContext(UserContext);
  const client = useQueryClient();
  const { showToast } = useToast();
  function createAppointment(formData) {
    return fetchWithError("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  return useMutation(createAppointment, {
    onSuccess: (newAppointment) => {
      console.log(newAppointment);
      const formattedDate = newAppointment.recurring
        ? formatRecurringTime(newAppointment.start_time, newAppointment.week_day)
        : formatSingleDate(newAppointment.start_time, newAppointment.date);
      const updatedUser = {
        ...user,
        appointments: [...user.appointments, newAppointment],
      };
      setUser(updatedUser);
      client.setQueryData(["user", "authorisation"], updatedUser);
      onCloseDialog();
      showToast("Scheduled", formattedDate);
    },
  });
}
