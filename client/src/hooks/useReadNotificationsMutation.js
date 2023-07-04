import { useMutation } from "@tanstack/react-query";
import fetchwithError from "../helpers/fetchWithError";
import { useContext } from "react";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";

export function useReadNotifcationsMutation() {
  async function patchNotifications() {
    return fetchWithError(`/api/notifications`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return useMutation(patchNotifications, {
    onSuccess: (r) => {
      console.log(r);
    },
  });
}
