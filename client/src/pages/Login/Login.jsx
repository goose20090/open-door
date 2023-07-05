/** @format */

import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <AuthWrapper>
      <h2>Login Page</h2>
      <LoginForm />
    </AuthWrapper>
  );
}

export const AuthWrapper = styled.div`
  height: 60vh;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  margin-top: 5%;
`;

export default Login;
