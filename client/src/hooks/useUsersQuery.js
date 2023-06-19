import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useUserQuery(url) {
  return useQuery(["users"], ({ signal }) => fetchWithError("api/me", { signal }), {
    retry: 0,
  });
}
