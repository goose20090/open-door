import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";
import { UserContext } from "../context/user";
import { useContext } from "react";

// This could be in another module/file:
function checkSession() {
  return fetchWithError("api/me");
}

export function useAuthQuery() {
  const { user, setUser } = useContext(UserContext);
  return useQuery(["user", "authorisation"], checkSession, {
    retry: 0,
    onSuccess: (r) => {
      setUser(r);
    },
  });
}
