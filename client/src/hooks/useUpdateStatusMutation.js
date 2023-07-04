import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";
import { useToast } from "./useToast";
import { formatRecurringTime } from "../helpers/formatRecurringTime";
import { formatSingleDate } from "../helpers/formatSingleDate";

export function useUpdateStatusMutation(appointment, action) {
  const { user, setUser } = useContext(UserContext);
  const client = useQueryClient();
  const { addToast } = useToast();

  let statusUpdateObj;

  if (action.toLowerCase() === "confirm") {
    statusUpdateObj = {
      status: "confirmed",
      rescheduled_by: appointment.rescheduled_by,
      rejected_by: null,
    };
  } else if (action.toLowerCase() === "reject") {
    statusUpdateObj = {
      status: "rejected",
      rescheduled_by: null,
      rejected_by: user.user_type.toLowerCase(),
    };
  }

  async function patchAppointment() {
    return fetchWithError(`api/appointments/${appointment.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(statusUpdateObj),
    });
  }

  const rescheduleAppointment = useMutation(patchAppointment, {
    onSuccess: (res) => {
      const updatedUser = {
        ...user,
        appointments: user.appointments.map((app) => (app.id === res.id ? res : app)),
      };
      setUser(updatedUser);
      client.setQueryData(["user", "authorisation"], updatedUser);
      if (res.status === "confirmed") {
        addToast("confirm", res, res.status);
      }
      if (res.status === "rejected") {
        addToast("reject", res, res.status);
      }
    },
  });

  return rescheduleAppointment;
}
