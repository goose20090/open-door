import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";

export function useCreateAppointment(onCloseDialog) {
  const { user, setUser } = useContext(UserContext);
  const client = useQueryClient();
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
      const updatedUser = {
        ...user,
        appointments: [...user.appointments, newAppointment],
      };
      setUser(updatedUser);
      client.setQueryData(["user", "authorisation"], updatedUser);
      onCloseDialog();
    },
  });
}
