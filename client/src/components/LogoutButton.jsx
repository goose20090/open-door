import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UserContext } from "../context/user";
import styled from "styled-components";
import React, { useContext } from "react";
import { useLogoutMutation } from "../hooks/useLogoutMutation";
import { Button } from "../assets/Buttons";

export default function LogoutButton() {
  const logoutMutation = useLogoutMutation();

  return <LogoutBtn onClick={logoutMutation.mutate}>Logout</LogoutBtn>;
}

const LogoutBtn = styled(Button)`
  background-color: white;
  box-shadow: inset 0 0 0 1px var(--blackA11);
  border-radius: 6px;

  &:hover {
    color: #535bf2;
    background-color: hsl(0, 0%, 98%);
    box-shadow: inset 0 0 0 1px #535bf2;
  }
  &:active {
    background-color: hsl(0, 0%, 95%);
  }
`;
