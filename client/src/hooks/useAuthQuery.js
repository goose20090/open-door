import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

// This could be in another module/file:
function checkSession() {
  return fetchWithError("api/me");
}

export function useAuthQuery() {
  return useQuery(["user", "authorisation"], checkSession, {
    retry: 0,
  });
}
