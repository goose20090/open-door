import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useTherapists() {
  return useQuery(["therapists"], () => fetchWithError("api/therapists"));
}
