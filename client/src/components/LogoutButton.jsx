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

  &:hover {
    color: #535bf2;
    background-color: hsl(0, 0%, 98%);
  }
  &:active {
    background-color: hsl(0, 0%, 95%);
  }
`;
