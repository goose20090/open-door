import { useQueryClient, useMutation } from "@tanstack/react-query";
import styled from "styled-components";

export default function LogoutButton() {
  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    });
  }

  const queryClient = useQueryClient();

  const logoutMutation = useMutation(handleLogout, {
    onSuccess: () => {
      queryClient.setQueryData(["user", "authorisation"], () => null);
    },
  });

  return <LogoutBtn onClick={logoutMutation.mutate}>Logout</LogoutBtn>;
}

const LogoutBtn = styled.button`
  padding: 8px;
  border: 1px solid black;
`;
