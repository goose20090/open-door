import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import styled from "styled-components";
import React, { useContext } from "react";
import { useLogoutMutation } from "../hooks/useLogoutMutation";

export default function LogoutButton() {
  const logoutMutation = useLogoutMutation();

  return <LogoutBtn onClick={logoutMutation.mutate}>Logout</LogoutBtn>;
}

const LogoutBtn = styled.button`
  padding: 8px;
  border: 1px solid black;
`;
