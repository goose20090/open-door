/** @format */

import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}

export const AuthWrapper = styled.div`
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`;

export default Login;
