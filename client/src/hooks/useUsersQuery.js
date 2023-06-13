import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useUserQuery(url) {
  return useQuery(["users"], () => fetchWithError("api/me"), {
    // onSuccess: (r) => {
    //   setUser(r);
    // },
    retry: 0,
  });
}
