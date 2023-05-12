/** @format */

import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Wrapper>
      <Heading>Open Door Therapy</Heading>
      <LinkWrapper>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
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

export default NavBar;
