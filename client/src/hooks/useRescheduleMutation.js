import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";

export function useRescheduleMutation(appointment, onCloseDialog) {
  const { user, setUser } = useContext(UserContext);
  const client = useQueryClient();

  async function patchAppointment(formData) {
    return fetchWithError(`/api/appointments/${appointment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  const rescheduleAppointment = useMutation(patchAppointment, {
    onSuccess: (res) => {
      onCloseDialog();

      const updatedUser = {
        ...user,
        appointments: user.appointments.map((app) => (app.id === res.id ? res : app)),
      };

      setUser(updatedUser);
      client.setQueryData(["user", "authorisation"], updatedUser);
    },
  });

  return rescheduleAppointment;
}
