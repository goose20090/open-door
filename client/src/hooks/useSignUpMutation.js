import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useToast } from "./useToast";
import { useHistory } from "react-router-dom";

export function useSignUpMutation(formData) {
  const queryClient = useQueryClient();
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  function attemptSignup() {
    return fetchWithError("api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  const signUpMutation = useMutation(attemptSignup, {
    onSuccess: (r) => {
      queryClient.setQueryData(["user", "authorisation"], () => r);
      setUser(r);
      history.push("/client-hub");
    },
    onError: (r) => console.log(r),
  });

  return signUpMutation;
}
