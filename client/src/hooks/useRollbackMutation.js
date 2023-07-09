import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";
import { ToastContext } from "../context/toast";

export function useRollbackMutation(appointment) {
  const { user, setUser } = useContext(UserContext);
  const { addToast } = useContext(ToastContext);
  const client = useQueryClient();

  async function patchAppointment(formData) {
    return fetchWithError(`/api/appointments/${appointment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rollback: true }),
    });
  }

  const rollbackAppointment = useMutation(patchAppointment, {
    onSuccess: (res) => {
      const updatedUser = {
        ...user,
        appointments: user.appointments.map((app) => (app.id === res.id ? res : app)),
      };

      setUser(updatedUser);
      client.setQueryData(["user", "authorisation"], updatedUser);
      debugger;
      addToast("rescheduleCancel", res, res.status);
    },
  });

  return rollbackAppointment;
}
