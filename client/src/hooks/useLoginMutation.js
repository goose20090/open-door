import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useToast } from "./useToast";

export function useLoginMutation(formData) {
  const queryClient = useQueryClient();
  const { user, setUser } = useContext(UserContext);
  const { addToast } = useToast();

  function attemptLogin(formData) {
    return fetchWithError("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  const loginMutation = useMutation(attemptLogin, {
    onSuccess: (r) => {
      queryClient.setQueryData(["user", "authorisation"], () => r);
      setUser(r);
    },
    onError: (r) => console.log(r),
  });

  return loginMutation;
}
