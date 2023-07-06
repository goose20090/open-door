import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";

export function useLoginMutation(formData) {
  const queryClient = useQueryClient();
  const { setUser } = useContext(UserContext);
  const history = useHistory();

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
      if (r.user_type === "Client") {
        history.push("/client-hub");
      }
      if (r.user_type === "Therapist") {
        history.push("/therapist-hub");
      }
    },
  });

  return loginMutation;
}
