/** @format */

import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function NavBar({ user, setUser }) {
  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    });
  }

  const queryClient = useQueryClient();

  const logoutMutation = useMutation(handleLogout, {
    onSuccess: () => {
      setUser(false);
      queryClient.setQueryData(["user", "authorisation"], () => null);
    },
  });

  return (
    <Wrapper>
      <Heading>Open Door Therapy</Heading>
      <LinkWrapper>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {user ? (
          <>
            <h2>Welcome {user.name}!</h2>
            <Link to="/bookings">Book a Session</Link>
            <LogoutBtn onClick={logoutMutation.mutate}>Logout</LogoutBtn>
          </>
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

const LogoutBtn = styled.button`
  padding: 8px;
  border: 1px solid black;
`;

export default NavBar;
