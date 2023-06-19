/** @format */

import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthQuery } from "../hooks/useAuthQuery";
import LogoutButton from "./LogoutBtn";

function NavBar() {
  const { data: user } = useAuthQuery();

  return (
    <Wrapper>
      <Heading>Open Door Therapy</Heading>
      <LinkWrapper>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {user ? (
          <UserSpecificLinks user={user} />
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </LinkWrapper>
    </Wrapper>
  );
}

function UserSpecificLinks({ user }) {
  if (user.user_type === "Client") {
    return (
      <>
        <Link to="/appointments">My Appointments</Link>
        <p>Logged in as: {user.name}</p>
        <LogoutButton />
      </>
    );
  } else {
    return (
      <>
        <Link to="/therapist-appointments">Therapists!!</Link>
        <LogoutButton />
      </>
    );
  }
}
const Wrapper = styled.header`
  background-color: white;
  overflow: hidden;
  justify-content: space-between;
  padding: 6px;
  display: flex;
`;

const LinkWrapper = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-around;

  p {
    font-weight: bold;
  }
`;

const Heading = styled.h1`
  width: 260px;
  color: revert;
  font-size: xx-large;
  flex: 1;
  &:hover {
    cursor: pointer;
  }
`;

const Link = styled(NavLink)`
  padding: 8px;
  border: 1px solid black;
`;

export default NavBar;
