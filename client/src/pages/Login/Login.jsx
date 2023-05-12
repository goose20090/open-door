/** @format */

import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <ContainingBlock>
      <Wrapper>
        <h1>Login Page</h1>
      </Wrapper>
    </ContainingBlock>
  );
}

export default Login;

const ContainingBlock = styled.div`
  position: relative;
  height: 70%;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  bottom: 50px;
  left: 33%;
  right: 33%;
  border: 1px solid black;
`;
