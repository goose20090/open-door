/** @format */

import React from "react";
import styled from "styled-components";

function NavBar() {
  return (
    <Wrapper>
      <Heading>Open Door Therapy</Heading>
      {/* <About></About> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  overflow: hidden;
`;

const Heading = styled.h1`
  width: 260px;
  color: revert;
  font-size: xx-large;

  &:hover {
    cursor: pointer;
  }
`;

export default NavBar;
