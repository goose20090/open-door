import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";

export function useDeleteAppointmentMutation(appointment) {
  const { user, setUser } = useContext(UserContext);
  const client = useQueryClient();

  async function deleteAppointment() {
    return fetch(`/api/appointments/${appointment.id}`, {
      method: "DELETE",
    });
  }

  const rescheduleAppointment = useMutation(deleteAppointment, {
    onSuccess: () => {
      const updatedUser = {
        ...user,
        appointments: user.appointments.filter((app) => app.id != appointment.id),
      };

      setUser(updatedUser);
      client.setQueryData(["user", "authorisation"], updatedUser);
    },
  });

  return rescheduleAppointment;
}
