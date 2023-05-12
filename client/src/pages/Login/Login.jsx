/** @format */

import React from "react";
import styled from "styled-components";
import LoginForm from "./Form";

function Login() {
  return (
    <ContainingBlock>
      <Wrapper>
        <h2>Login Page</h2>
        <LoginForm />
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
  left: 25%;
  right: 25%;
  border: 1px solid black;
  padding: 8px;
`;
