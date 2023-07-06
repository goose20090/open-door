import { useContext } from "react";
import { UserContext } from "../context/user";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import fetchWithError from "../helpers/fetchWithError";
import { useToast } from "./useToast";

export function useLogoutMutation() {
  const { user, setUser } = useContext(UserContext);
  const { removeAllToast } = useToast();
  const queryClient = useQueryClient();
  const history = useHistory();

  async function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    });
  }

  return useMutation(handleLogout, {
    onSuccess: () => {
      queryClient.setQueryData(["user", "authorisation"], () => null);
      history.push("/");
      removeAllToast();
      setUser(null);
    },
  });
}
