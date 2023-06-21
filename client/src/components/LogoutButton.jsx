import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import styled from "styled-components";
import React, { useContext } from "react";

export default function LogoutButton() {
  const { user, setUser } = useContext(UserContext);
  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    });
  }

  const queryClient = useQueryClient();

  const logoutMutation = useMutation(handleLogout, {
    onSuccess: () => {
      queryClient.setQueryData(["user", "authorisation"], () => null);
      setUser(false);
    },
  });

  return <LogoutBtn onClick={logoutMutation.mutate}>Logout</LogoutBtn>;
}

const LogoutBtn = styled.button`
  padding: 8px;
  border: 1px solid black;
`;
