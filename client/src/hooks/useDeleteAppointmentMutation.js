import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../hooks/useToast";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";
import { formatRecurringTime } from "../helpers/formatRecurringTime";
import { formatSingleDate } from "../helpers/formatSingleDate";

export function useDeleteAppointmentMutation(appointment) {
  const { user, setUser } = useContext(UserContext);
  const otherPartyName =
    user.user_type === "Therapist" ? appointment.client.name : appointment.therapist.name;
  const client = useQueryClient();
  const { addToast } = useToast();

  async function deleteAppointment() {
    return fetch(`/api/appointments/${appointment.id}`, {
      method: "DELETE",
    });
  }

  const deleteAppointmentMutation = useMutation(deleteAppointment, {
    onSuccess: () => {
      const updatedUser = {
        ...user,
        appointments: user.appointments.filter((app) => app.id != appointment.id),
      };
      const formattedDate = appointment.recurring
        ? formatRecurringTime(appointment.start_time, appointment.week_day)
        : formatSingleDate(appointment.start_time, appointment.date);

      setUser(updatedUser);
      client.setQueryData(["user", "authorisation"], updatedUser);
      addToast("delete", appointment, "deleted");
    },
  });

  return deleteAppointmentMutation;
}
