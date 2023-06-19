import { useQueryClient, useMutation } from "@tanstack/react-query";

function handleLogout() {
  fetch("/api/logout", {
    method: "DELETE",
  });
}

const queryClient = useQueryClient();

export function useLogout() {
  return useMutation(handleLogout, {
    onSuccess: () => {
      queryClient.setQueryData(["user"], () => null);
    },
  });
}
